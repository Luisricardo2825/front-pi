import {
  Button,
  Center,
  Checkbox,
  Flex,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import Link from "@/Component/Link";

import classes from "./Login.module.css";
import { notifications } from "@mantine/notifications";
import Layout from "../Layout";

export default function LoginForm() {
  const FieldWidth = "20vw";
  const [isSubmitting, setSubmitting] = React.useState(false);

  const [isLogin, setLogin] = React.useState(true);
  let animationProps = isLogin
    ? {
        initial: { rotateY: 90 },
        animate: { rotateY: 0, transition: { duration: 0.3, ease: "linear" } },
        exit: { rotateY: 90, transition: { duration: 0.3, ease: "linear" } },
      }
    : undefined;
  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    await setTimeout(() => {
      /* Do something */
      notifications.show({
        title: "Logado com sucesso",
        message: "Bem vindo, Ricardo",
        color: "green",
      });
      setSubmitting(false);
    }, 1000);
  };

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
            p={20}
          >
            <Center>
              <Link
                fz={"3rem"}
                className={classes.link}
                href="/"
                onClick={() => setLogin(false)}
                w={"fit-content"}
              >
                Login
              </Link>
            </Center>
            <Center w={"100%"}>
              <Flex
                align={"center"}
                justify={"center"}
                direction={"column"}
                w={"100%"}
                h={"50vh"}
              >
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Usuário"
                  variant="filled"
                  w={FieldWidth}
                  h="50px"
                  mt={"md"}
                />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  variant="filled"
                  w={FieldWidth}
                  h="50px"
                  mt={"md"}
                />
                <Flex
                  direction={"row"}
                  justify={"space-between"}
                  w={"60%"}
                  align={"center"}
                  mt={"sm"}
                  c={"gray.5"}
                >
                  <Checkbox
                    id="remeberMe"
                    label="Lembrar-me"
                    name="remeberMe"
                    type="checkbox"
                    size="xs"
                  />
                  <Link href="/" c="red.400" fz={".8rem"}>
                    Recuperar senha
                  </Link>
                </Flex>
                <Button
                  mt={"md"}
                  color="red"
                  ml={"0"}
                  type="submit"
                  w={"10vw"}
                  style={{ borderRadius: "100px" }}
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Flex
                  fz={"xs"}
                  c={"#707070"}
                  mt={"lg"}
                  w={"100%"}
                  justify={"center"}
                  align={"center"}
                  direction={"column"}
                  lh={"15pt"}
                >
                  Não possui uma conta?
                  <Flex>
                    <Link href={"/register"} c="red.6" fz={"xs"}>
                      registre-se.
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
            </Center>
          </Flex>
        </Paper>
      </Center>
    </Layout>
  );
}
