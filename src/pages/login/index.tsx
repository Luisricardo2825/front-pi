import LoginForm from "@/Component/Login";
import {
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  StyleProp,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "@/Component/Link";
import Head from "next/head";
import React from "react";
import classes from "./Login.module.css";
import FlipAnimation from "@/Component/animation";
import { Property } from "csstype";
import RegisterForm from "@/Component/Register";

export default function Login() {
  const [flipped, setFlipped] = React.useState(false);
  const borderRadius = "10px";
  const Divw = "100%";
  return (
    <Flex justify="center" align="center" h={"100vh"} bg={"red.1"} w="100vw">
      <Head>
        <title>Login</title>
      </Head>
      <Center>
        <FlipAnimation
          back={
            <Front
              borderRadius={borderRadius}
              Divw={Divw}
              onClick={() => {
                setFlipped(!flipped);
              }}
            />
          }
          front={
            <RegisterForm
              onClick={() => {
                setFlipped(!flipped);
              }}
            />
          }
          flipped={flipped}
        />
      </Center>
    </Flex>
  );
}

function Front(props: {
  Divw: StyleProp<Property.Width<string | number> | undefined>;
  borderRadius: any;
  onClick: () => void;
}) {
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
    <Flex
      w={"150%"}
      ml="-20%"
      h={"80vh"}
      direction="column"
      style={{
        borderRadius: props.borderRadius,
      }}
      bg={"white"}
      justify={"center"}
    >
      <Center>
        <Link fz={"3rem"} className={classes.link} href="/" w={"fit-content"}>
          Login
        </Link>
      </Center>
      <Center w={"100%"}>
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
          <Flex
            direction={"row"}
            justify={"space-between"}
            w={"80%"}
            mt={"xl"}
            c={"gray.5"}
          >
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
            <Text onClick={props.onClick} c="red.6">
              registre-se
            </Text>{" "}
            hoje!
          </Text>
        </Flex>
      </Center>
    </Flex>
  );
}
