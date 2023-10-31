import { Flex } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import RecuperarForm from "@/Component/RecuperarSenha";

export default function Login() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  const onSubmit = async () => {};
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.4"} w="100vw">
      <Head>
        <title>Esqueci a senha</title>
      </Head>
      <RecuperarForm />
    </Flex>
  );
}