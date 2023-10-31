import { LoginRet } from "@/@Types/Login";
import { atom, createStore } from "jotai";
import Cookies from "js-cookie";

export const myStore = createStore();
const data = Cookies.get("user");
export const userAtom = atom(data ? (JSON.parse(data) as LoginRet) : undefined);
