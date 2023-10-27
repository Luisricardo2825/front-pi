import { Button, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

import validationSchemaRegister from "./Schemas";
import Link from "@/Component/Link";

const RegisterForm: React.FC = () => {
  const TextInputWidth = "25vw";

  const DivWidth = "40%";

  return (
    <Flex
      justify={"center"}
      align={"center"}
      mih={"100vh"}
      direction={"column"}
      bg={"red.1"}
    >
      <Flex
        bg={"white"}
        w={DivWidth}
        h={"80vh"}
        style={{
          borderRadius: 20,
          boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.25)",
        }}
        justify={"center"}
        align={"center"}
      >
        <Flex justify={"right"} align={"center"} direction={"column"}>
          <Link href="/">
            <Text size="3rem" fw="bold">
              Register
            </Text>
          </Link>

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
            placeholder="password"
            variant="filled"
            w={TextInputWidth}
            height="50px"
            mt={"md"}
          />
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm a senha"
            label="Confirm a senha"
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
            placeholder="Birth date"
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
              <Text size={"sm"} c={"#afafaf"}>
                Já possui uma conta?{" "}
                <Link href="/login" c={"red"}>
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
      </Flex>
    </Flex>
  );
};

export default RegisterForm;
