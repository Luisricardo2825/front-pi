import Layout from "@/Component/Layout";
import RegisterForm from "@/Component/Register";
import { Center, Flex, Paper } from "@mantine/core";
import Head from "next/head";
import React from "react";

const Register: React.FC = () => {
  let animationProps = {
    initial: { rotateX: -90 },
    animate: { rotateX: 0, transition: { duration: 0.3, ease: "linear" } },
    exit: { rotateX: -90, transition: { duration: 0.3, ease: "linear" } },
  };
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.4"} w="100vw">
      <Head>
        <title>Registrar</title>
      </Head>
      <Layout {...animationProps}>
        <Center>
          <Paper
            style={{
              boxShadow: "5px 10px 15px #1d1a1a5e",
            }}
          >
            <RegisterForm />
          </Paper>
        </Center>
      </Layout>
    </Flex>
  );
};
export default Register;
