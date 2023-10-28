import { Button, Center, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

import Link from "@/Component/Link";

import classes from "./Register.module.css";

const RegisterForm: React.FC = () => {
  const TextInputWidth = "25vw";

  return (
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
        <Link fz={"3rem"} className={classes.link} href="/" w={"fit-content"}>
          Registrar
        </Link>
      </Center>
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
      <TextInput
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
      <TextInput
        id="birthDate"
        label="Data de nascimento"
        name="birthDate"
        withAsterisk
        placeholder="Data nascimento"
        type="date"
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
        <Button
          color="red"
          ml={"auto"}
          type="submit"
          w={"100%"}
          style={{ borderRadius: 100 }}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default RegisterForm;
