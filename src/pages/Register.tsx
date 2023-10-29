import Layout from "@/Component/Layout";
import RegisterForm from "@/Component/Register";
import { Center, Flex, Paper } from "@mantine/core";
import Head from "next/head";
import React from "react";

const Register: React.FC = () => {
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.4"} w="100vw">
      <Head>
        <title>Registrar</title>
      </Head>
      <RegisterForm />
    </Flex>
  );
};
export default Register;
