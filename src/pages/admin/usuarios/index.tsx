import { LoginRet } from "@/@Types/Login";
import { Content } from "@/@Types/Page";
import { User } from "@/@Types/User";
import RegisterForm, { RegisterFormvalues } from "@/Component/Register";
import { UsersTable } from "@/Component/Table/User";
import fetchApi from "@/utils/fetcher";
import { Button, Container } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export default function Admin({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const onSubmit = async (values: RegisterFormvalues) => {
    alert(JSON.stringify(values));
    return true;
  };

  console.log(users.content);
  return (
    <Container>
      <Button
        leftSection={<IconPlus />}
        color="green"
        size="xs"
        onClick={() => {
          modals.open({
            withCloseButton: false,
            children: <RegisterForm onSubmit={onSubmit} />,
            size: "lg",
            styles: {
              body: {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              },
              content: {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              },
              header: {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              },
            },
          });
        }}
      >
        Novo
      </Button>
      <UsersTable users={users.content} />
    </Container>
  );
}

export const getServerSideProps = (async (context) => {
  const { token } = JSON.parse(context.req.cookies["user"] || "{}") as LoginRet;
  try {
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
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}) satisfies GetServerSideProps<{
  users: Content<User>;
}>;
