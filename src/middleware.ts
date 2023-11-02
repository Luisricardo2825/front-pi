import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LoginRet } from "./@Types/Login";
import { myStore, userAtom } from "./atoms/auth";

const pagesBlockedWheLoged = ["/login", "/register", "/recuperar"];
const authOnlyPages = ["^/admin.*$"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("user");
  const user = myStore.get(userAtom);
  const pathName = request.nextUrl.pathname;
  const isAuth = CheckIfAuthenticated(request);
  if (!isAuth) {
    for (const rule of authOnlyPages) {
      if (checkRoute(rule, pathName)) {
        console.log(
          `Não é possivel ir para a pagina "${pathName}" enquanto não logado! Faça login primeiro!`
        );
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (user) {
      const response = logout(NextResponse.redirect(new URL("/", request.url)));
      console.log("Usuário foi deslogado");
      return response;
    }
    return NextResponse.next();
  }

  const userData = JSON.parse(cookie?.value || "{}") as LoginRet;
  const { exp, token } = userData;
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

async function refreshToken(token: string) {
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
    const response = NextResponse.next();
    response.cookies.delete("user");
    myStore.set(userAtom, undefined);
    console.log("Erro ao renovar token:", resJSON.message);
    return response;
  }
  const result = await resFetch.json();
  const data: LoginRet = result as LoginRet;
  return data;
}

function logout(response: NextResponse) {
  response.cookies.delete("user");
  myStore.set(userAtom, undefined);
  return response;
}

function checkRoute(str: string, pathName: string) {
  const regex = new RegExp(str);
  return regex.test(pathName);
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
