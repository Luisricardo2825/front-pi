import { LoginRet } from "@/@Types/Login";
import { myStore, userAtom } from "@/atoms/auth";
import { notifications } from "@mantine/notifications";
import Cookies from "js-cookie";

const pagesBlocked = ["/login", "/register", "/recuperar"];
const authOnlyPages = ["^/admin.*$"];

export default async function refreshToken(pathName: string) {
  const user = myStore.get(userAtom);
  const cookie = Cookies.get("user");
  if (!cookie) {
    console.log("Cookie não encontrado");
    for (const rule of authOnlyPages) {
      if (checkRoute(rule, pathName)) {
        console.log(
          `Não é possivel ir para a pagina "${pathName}" enquanto não logado! Faça login primeiro!`
        );
        return pathName;
      }
    }
    if (user) {
      logout();
      return "/";
    }
    return pathName;
  }

  const userData = JSON.parse(cookie || "{}") as LoginRet;
  const { exp, token } = userData;
  const expDate = new Date(exp - 60_000); // Data expiração - 1 minuto

  if (expDate.getTime() > Date.now()) {
    console.log("Token valido. Exp:", expDate.getTime(), Date.now());
    if (!user) {
      console.log("Dados de usuário não definidos! Redefinindo dados...");
      myStore.set(userAtom, userData);
    }
    if (pagesBlocked.includes(pathName)) {
      return "/";
    }
    return pathName;
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
    notifications.show({
      message:
        "Erro ao renovar token:" + resJSON.message + ". Fazendo logout...",
      color: "red",
    });
    logout();
    return "/";
  }

  const result = await resFetch.json();
  const data: LoginRet = result as LoginRet;

  Cookies.set("user", JSON.stringify(data), {
    expires: new Date(data.exp),
  });
  console.log("Token renovado");

  return "/";
}

// function CheckIfAuthenticated() {
//   const cookie = Cookies.get("user");
//   if (!cookie) return false;
//   return true;
// }
function checkRoute(str: string, pathName: string) {
  const regex = new RegExp(str);
  return regex.test(pathName);
}

function logout() {
  myStore.set(userAtom, undefined);
  Cookies.remove("user");
  notifications.show({
    message: "Deslogado com sucesso",
    color: "green",
  });
}
