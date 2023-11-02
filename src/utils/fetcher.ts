import { myStore, userAtom } from "@/atoms/auth";

export default function fetchApi(input: RequestInfo | URL, init?: RequestInit) {
  const user = myStore.get(userAtom);
  const thisInit: RequestInit = { ...init };

  let headers = new Headers(init?.headers);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  if (user?.token) {
    headers.append("Authorization", `Bearer ${user.token}`);
  }

  input = treatInput(input, headers);
  thisInit.headers = headers;
  return fetch(input, thisInit);
}

function treatInput(input: RequestInfo | URL, headers: Headers) {
  if (typeof input == "object") {
    const thisInput = input as Writeable<Request>;
    thisInput.url = process.env.NEXT_PUBLIC_API_PATH + thisInput.url;
    thisInput.headers = headers;
    return thisInput;
  } else {
    return process.env.NEXT_PUBLIC_API_PATH + input;
  }
}
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
