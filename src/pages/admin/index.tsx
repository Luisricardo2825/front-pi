import { LoginRet } from "@/@Types/Login";
import { Content } from "@/@Types/Page";
import { User } from "@/@Types/User";
import { ActionsGrid } from "@/Component/admin/actions";
import fetchApi from "@/utils/fetcher";
import { Container } from "@mantine/core";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

export default function Admin({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container size={"xs"} mt={50}>
      <Head>
        <title>Administração</title>
        <meta name="description" content="Painel administrativo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ActionsGrid />
    </Container>
  );
}

export const getServerSideProps = (async (context) => {
  const { token } = JSON.parse(context.req.cookies["user"] || "{}") as LoginRet;
  const users: Content<User> = await (
    await fetchApi("/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
  ).json();
  return {
    props: { users },
  };
}) satisfies GetServerSideProps<{
  users: Content<User>;
}>;
