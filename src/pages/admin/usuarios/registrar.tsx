import Layout from "@/Component/Layout";
import RegisterForm, { RegisterFormvalues } from "@/Component/Register";
import { Flex } from "@mantine/core";
import Head from "next/head";
import React from "react";

const Register: React.FC = () => {
  const onSubmit = async (values: RegisterFormvalues) => {
    alert(JSON.stringify(values));
    return true;
  };
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.4"} w="100vw">
      <Head>
        <title>Registrar</title>
      </Head>
      <RegisterForm onSubmit={onSubmit} />
    </Flex>
  );
};
export default Register;
