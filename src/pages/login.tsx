import { Center, Flex, Paper } from "@mantine/core";
import Head from "next/head";
import React from "react";
import Layout from "@/Component/Layout";
import LoginForm from "@/Component/Login";

export default function Login() {
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.4"} w="100vw">
      <Head>
        <title>Login</title>
      </Head>

      <LoginForm />
    </Flex>
  );
}
