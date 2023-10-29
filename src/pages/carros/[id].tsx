import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  GridCol,
  Image,
  Modal,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IconUser } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { MaskedInput } from "@/Component/MaskedInput";
import { Carro } from "@/@Types/Carro";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

export default function Page({
  carro,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { id } = router.query;
  function onSubmit() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      telefone: "85 997611655",
      carId: id,
      nome: "Ricardo",
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/interests", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        notifications.show({
          title: "Sucesso",
          color: "green",
          message: "Interesse registrado!",
        });
        router.push("/carros");
      })
      .catch((error) => {
        notifications.show({
          title: "Erro",
          color: "red",
          message: "Erro:" + error,
        });
        console.error(error);
      });
  }

  carro.anoModelo = carro.anoModelo.slice(0, 4);
  return (
    <Grid justify={"center"} align="stretch" h={"100%"} pt={"10vh"}>
      <Head>
        <title>
          Carro {carro.marca} {carro.modelo}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Carro ${carro.marca} ${carro.modelo}`}
        />
        <meta
          property="og:title"
          content={`Carro ${carro.marca} ${carro.modelo}`}
        />
      </Head>
      <GridCol span={4}>
        <Image
          radius="md"
          h={500}
          w={600}
          src={carro.image}
          alt={carro.modelo}
        />
      </GridCol>
      <GridCol span={6}>
        <Paper shadow="xs" p="xl" mih={"100%"}>
          <Flex justify={"space-between"}>
            <Title order={3}>
              <Text c="red" size="lg" fw={"bold"}>
                {carro.marca}
              </Text>
              {carro.modelo} {carro.anoModelo}
            </Title>
            <Tooltip label="Gostei">
              <ActionIcon
                size="sm"
                color="red"
                variant="transparent"
                onClick={open}
              >
                <IconHeart />
              </ActionIcon>
            </Tooltip>
          </Flex>

          <Flex mt={20} h={300} mah={300} direction={"column"}>
            <Title order={4}>Descrição</Title>
            <ScrollArea
              mt={"sm"}
              h={250}
              bg="gray.1"
              w={"100%"}
              p={"sm"}
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              {carro.descricao}
            </ScrollArea>
          </Flex>

          <Flex w={"100%"} justify={"center"}>
            <Button
              variant="light"
              color="red"
              size="lg"
              radius={"xl"}
              onClick={open}
            >
              Estou interessado
            </Button>
          </Flex>
        </Paper>
        <Modal opened={opened} onClose={close} title="Estou interessado">
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconUser />}
            label="Nome"
            withAsterisk
            placeholder="Nome"
          />
          <MaskedInput
            mt={10}
            placeholder="Telefone"
            label={"Telefone"}
            withAsterisk
            mask={["(00) 0000-0000", "(00) 9 0000-0000"]}
          />
          <Flex align={"flex-end"} justify={"flex-end"} w="100%" mt={"lg"}>
            <Button
              ml={10}
              onClick={() => {
                onSubmit();
                close();
              }}
              variant="outline"
              color="red"
            >
              Estou interessado
            </Button>
          </Flex>
        </Modal>
      </GridCol>
    </Grid>
  );
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params as { id: string };
  const res = await fetch(`http://localhost:8080/cars/${id}`);

  const carro: Carro = await res.json();

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return { notFound: true };
  }
  return { props: { carro: carro } };
}) satisfies GetServerSideProps<{
  carro: Carro;
}>;
