import {
  Button,
  Center,
  Checkbox,
  Flex,
  Paper,
  StyleProp,
  TextInput,
} from "@mantine/core";
import Link from "@/Component/Link";
import Head from "next/head";
import React from "react";
import classes from "./Login.module.css";
import FlipAnimation from "@/Component/animation";
import RegisterForm from "@/Component/Register";
import { notifications } from "@mantine/notifications";
import Layout from "@/Component/Layout";
import LoginForm from "@/Component/Login";

export default function Login() {
  let animationProps = {
    initial: { rotateX: 90 },
    animate: { rotateX: 0, transition: { duration: 0.3, ease: "linear" } },
    exit: { rotateX: 90, transition: { duration: 0.3, ease: "linear" } },
  };
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.4"} w="100vw">
      <Head>
        <title>Login</title>
      </Head>
      <Layout {...animationProps}>
        <Center>
          <Paper
            style={{
              boxShadow: "5px 10px 15px #1d1a1a5e",
            }}
          >
            <LoginForm />
          </Paper>
        </Center>
      </Layout>
    </Flex>
  );
}
