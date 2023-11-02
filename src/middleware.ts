import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LoginRet } from "./@Types/Login";
import { myStore, userAtom } from "./atoms/auth";

const pagesBlockedWheLoged = ["/login", "/register", "/recuperar"];
const authOnlyPages = ["^/admin.*$"];
const adminOnlyPage = ["^/admin.*$"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("user");
  const user = myStore.get(userAtom);
  const pathName = request.nextUrl.pathname;
  const isAuth = CheckIfAuthenticated(request);
  if (!isAuth) {
    for (const rule of authOnlyPages) {
      if (checkRule(rule, pathName)) {
        console.log(
          `Não é possivel ir para a pagina "${pathName}" enquanto não logado! Faça login primeiro!`
        );
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (user) {
      myStore.set(userAtom, undefined);
      console.log("Usuário foi deslogado");
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const userData = JSON.parse(cookie?.value || "{}") as LoginRet;
  const { exp, token, role } = userData;

  for (const rule of adminOnlyPage) {
    if (checkRule(rule, pathName) && role.toLocaleLowerCase() != "admin") {
      console.log("Não é admin");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const expDate = new Date(exp - 60_000); // Data expiração - 1 minuto

  if (expDate.getTime() > Date.now()) {
    console.log("Token valido. Exp:", expDate.getTime(), Date.now());
    if (!user) {
      console.log("Dados de usuário não definidos! Redefinindo dados...");
      myStore.set(userAtom, userData);
    }
    if (pagesBlockedWheLoged.includes(pathName)) {
      console.log(
        `Não é possivel ir para a pagina "${pathName}" enquanto logado! Faça logout primeiro!`
      );
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const resFetch = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/refresh", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      token,
    }),
    redirect: "follow",
  });
  if (!resFetch.ok) {
    const resJSON = await resFetch.json();
    const response = logout(NextResponse.next());

    console.log("Erro ao renovar token:", resJSON.message);
    return response;
  }

  const response = NextResponse.next();

  const result = await resFetch.json();
  const data: LoginRet = result as LoginRet;

  response.cookies.set({
    name: "user",
    value: JSON.stringify(data),
    expires: new Date(data.exp),
  });
  console.log("Token renovado");

  return response;
}

function CheckIfAuthenticated(request: NextRequest) {
  let cookie = request.cookies.get("user");
  if (!cookie) return false;
  return true;
}

function logout(response: NextResponse) {
  response.cookies.delete("user");
  myStore.set(userAtom, undefined);
  return response;
}

function checkRule(str: string, pathName: string) {
  const regex = new RegExp(str);
  return regex.test(pathName);
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
