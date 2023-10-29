import "@mantine/dates/styles.css";
import { DateInput } from "@mantine/dates";

import { Button, Center, Flex, Paper, Text, TextInput } from "@mantine/core";
import React from "react";

import Link from "@/Component/Link";

import classes from "./Register.module.css";
import Layout from "../Layout";
import PasswordWithStrengthChecker from "../PasswordWithStrengthChecker";

const RegisterForm: React.FC = () => {
  const [isLogin, setIslogin] = React.useState(true);
  const TextInputWidth = "20vw";
  let animationProps = isLogin
    ? {
        initial: { rotateY: -90 },
        animate: { rotateY: 0, transition: { duration: 0.3, ease: "linear" } },
        exit: { rotateY: -90, transition: { duration: 0.3, ease: "linear" } },
      }
    : undefined;
  return (
    <Layout {...animationProps}>
      <Center>
        <Paper
          style={{
            boxShadow: "5px 10px 15px #1d1a1a5e",
          }}
        >
          <Flex
            w={"30vw"}
            direction="column"
            style={{
              borderRadius: "10px",
            }}
            bg={"white"}
            justify={"center"}
            align={"center"}
            p={10}
          >
            <Center>
              <Link
                fz={"3rem"}
                className={classes.link}
                href="/"
                onClick={() => {
                  setIslogin(false);
                }}
                w={"fit-content"}
              >
                Registrar
              </Link>
            </Center>
            <Center w={"100%"}>
              <Flex
                align={"center"}
                justify={"center"}
                direction={"column"}
                w={"100%"}
                h={"40vh"}
              >
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome"
                  label="Nome"
                  withAsterisk
                  variant="filled"
                  w={TextInputWidth}
                  height="50px"
                  mt={"md"}
                />
                <PasswordWithStrengthChecker
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  label="Sua senha"
                  withAsterisk
                  variant="filled"
                  w={TextInputWidth}
                  height="50px"
                  mt={"md"}
                />
                <DateInput
                  valueFormat="DD/MM/YYYY"
                  id="birthDate"
                  label="Data de nascimento"
                  name="birthDate"
                  withAsterisk
                  placeholder="Data nascimento"
                  variant="filled"
                  w={TextInputWidth}
                  height="50px"
                  mt={"md"}
                />
                <Flex
                  justify={"center"}
                  align={"center"}
                  direction={"column"}
                  m={10}
                  mt={"md"}
                >
                  <Button
                    color="red"
                    ml={"auto"}
                    type="submit"
                    w={"100%"}
                    style={{ borderRadius: 100 }}
                  >
                    Register
                  </Button>
                  <Flex
                    w={"100%"}
                    justify={"center"}
                    align={"center"}
                    direction={"column"}
                    mb={"sm"}
                  >
                    <Text size={"sm"} c={"#afafaf"} fz={"xs"} mt={"md"} p={2}>
                      Já possui uma conta?{" "}
                      <Link c={"red"} href="/login" fz={"xs"}>
                        Entrar
                      </Link>
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Center>
          </Flex>
        </Paper>
      </Center>
    </Layout>
  );
};

export default RegisterForm;
