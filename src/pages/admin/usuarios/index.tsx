import { LoginRet } from "@/@Types/Login";
import { Content } from "@/@Types/Page";
import { User } from "@/@Types/User";
import { UsersTable } from "@/Component/Table/User";
import fetchApi from "@/utils/fetcher";
import { Container } from "@mantine/core";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";

export default function Admin({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container>
      <UsersTable users={users.content} />
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
