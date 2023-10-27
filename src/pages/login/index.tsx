import LoginForm from "@/Component/Login";
import { Flex, Text } from "@mantine/core";
import Link from "@/Component/Link";
import Head from "next/head";
import React from "react";
import classes from "./Login.module.css";
const Login: React.FC = () => {
  const borderRadius = "10px";
  const Divw = "90%";
  return (
    <Flex
      justify="center"
      align="center"
      h={"100vh"}
      bg={"red.1"}
      w="100vw"
      m={0}
    >
      <Head>
        <title>Login</title>
      </Head>
      <Flex
        bg={"white"}
        w={Divw}
        style={{
          borderRadius: borderRadius,
          boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.25)",
        }}
        h={"90vh"}
      >
        <Flex
          w={Divw}
          h={"70vh"}
          align="center"
          direction="column"
          style={{
            borderRadius: borderRadius,
          }}
        >
          <Text size="3rem" fw="extrabold" ml={"auto"} mr={"auto"}>
            <Text
              className={classes.link}
              // component={Link}
              // size="3rem"
              // // c="dark"
              // fw={"bolder"}
              // href="/"
              // style={{ textDecoration: "none" }}
            >
              Login
            </Text>
          </Text>
          <Flex
            direction={"row"}
            justify={"center"}
            align={"center"}
            mt="30%"
            style={{
              borderRadius: borderRadius,
            }}
          >
            <LoginForm />
          </Flex>
        </Flex>
        {/* Login Form box end here */}
        <Flex
          w={"100%"}
          h={"70vh"}
          bg="red.6"
          justify="center"
          align="center"
          style={{
            borderRadius: borderRadius,
          }}
          color={"white"}
        >
          <Flex justify="center" align="center" direction="column" w="90%">
            <Text size="3rem" fw="bold">
              Welcome back!
            </Text>
            <Flex justify="center" align="center" direction="column">
              <Text m={3} size={"sm"} fw="thin">
                This is the login page. If you dont have an account, please{" "}
                <Link href="/Register" c={"white"}>
                  register
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
