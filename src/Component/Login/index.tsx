import { Button, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

import ILoginForm from "./Types/ILoginForm";

import validationSchema from "./Schemas/Validation";
import Link from "next/link";

const LoginForm: React.FC<ILoginForm> = () => {
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
    <form>
      <Flex justify={"right"} align={"center"} direction={"column"} ml={10}>
        <TextInput
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          variant="filled"
          w={FieldWidth}
          h="50px"
        />
        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="password"
          variant="filled"
          width={FieldWidth}
          height="50px"
        />
        <Flex direction={"row"} justify={"space-between"}>
          <TextInput
            id="remeberMe"
            label="Remember Me"
            name="remeberMe"
            type="checkbox"
          />
          <Link href="/" color="red.400">
            Forgot your password?
          </Link>
        </Flex>
      </Flex>

      <Flex justify="center" align={"center"} direction={"column"}>
        <Button
          mt={2}
          color="red"
          bg="red.500"
          ml={"0"}
          type="submit"
          w={"10vw"}
          style={{ borderRadius: "100px" }}
        >
          Submit
        </Button>
        <Text mt={2} ml={0} size={"sm"} color={"#707070"}>
          Don&apos;t have an account?
          <Link href="/Register">Register</Link>
        </Text>
      </Flex>
    </form>
  );
};

export default LoginForm;
