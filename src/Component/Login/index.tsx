import { Button, Checkbox, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

import ILoginForm from "./Types/ILoginForm";

import validationSchema from "./Schemas/Validation";
import Link from "@/Component/Link";

export default function LoginForm() {
  const FieldWidth = "20vw";
  const [isSubmitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    await setTimeout(() => {
      /* Do something */
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Flex align={"center"} justify={"center"} direction={"column"}>
      <TextInput
        id="username"
        name="username"
        type="text"
        placeholder="Username"
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
        label="Sua senha"
        variant="filled"
        w={FieldWidth}
        h="50px"
        mt={"md"}
      />
      <Flex direction={"row"} justify={"space-between"} w={"80%"} mt={"xl"} c={"gray.5"}>
        <Checkbox
          id="remeberMe"
          label="Lembrar-me"
          name="remeberMe"
          type="checkbox"
          fz={"sm"}
        />
        <Link href="/" c="red.400" fz={"sm"}>
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
      >
        Submit
      </Button>
      <Text size={"sm"} c={"#707070"} mt={"lg"}>
        Não possui uma conta?{" "}
        <Link href="/register" c="red.6">
          registre-se
        </Link>{" "}
        hoje!
      </Text>
    </Flex>
  );
}
