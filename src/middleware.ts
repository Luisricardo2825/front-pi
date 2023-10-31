import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LoginRet } from "./@Types/Login";
import { myStore, userAtom } from "./atoms/auth";

const pagesBlocked = ["/login", "/register", "/recuperar"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("user");
  const user = myStore.get(userAtom);
  const pathName = request.nextUrl.pathname;
  if (!cookie) {
    if (user) {
      console.log("Usuário foi deslogado");
      myStore.set(userAtom, undefined);
      return NextResponse.redirect(new URL("/", request.url));
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
    if (pagesBlocked.includes(pathName)) {
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
    const response = NextResponse.next();
    response.cookies.delete("user");
    myStore.set(userAtom, undefined);
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
