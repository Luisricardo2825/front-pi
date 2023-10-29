import { LoginRet } from "@/@Types/Login";
import { atomWithStorage } from "jotai/utils";
import Cookies from "js-cookie";

const data = Cookies.get("user");
export const userAtom = atomWithStorage<LoginRet | undefined>(
  "user",
  data ? JSON.parse(data) : undefined
);
