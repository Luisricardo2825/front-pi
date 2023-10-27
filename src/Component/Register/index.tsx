import { Button, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

import Link from "@/Component/Link";

interface IProps {
  onClick: () => void;
}
const RegisterForm: React.FC<IProps> = (props) => {
  const TextInputWidth = "25vw";

  return (
    <Flex
      align={"center"}
      mih={"60vh"}
      direction={"column"}
      w={"150%"}
      ml="-20%"
      h={"80vh"}
      style={{
        borderRadius: "10px",
      }}
      bg={"white"}
      justify={"center"}
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
          placeholder="Senha"
          label="Sua senha"
          withAsterisk
          variant="filled"
          w={TextInputWidth}
          height="50px"
          mt={"md"}
        />
        <TextInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Senha"
          label="Confirme a senha"
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
              <Text c={"red"} onClick={props.onClick}>
                Entrar
              </Text>
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
  );
};

export default RegisterForm;
