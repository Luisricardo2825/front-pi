import { LoginRet } from "@/@Types/Login";
import { Content } from "@/@Types/Page";
import { RegisterResponse } from "@/@Types/Register";
import { User } from "@/@Types/User";
import RegisterForm, { RegisterFormvalues } from "@/Component/Register";
import { UsersTable } from "@/Component/Table/User";
import fetchApi from "@/utils/fetcher";
import { Button, Container, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export default function Admin({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const onSubmit = async (values: RegisterFormvalues) => {
    try {
      const response = await fetchApi("/users", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw response;
      }

      const result: RegisterResponse = await response.json();

      notifications.show({
        title: "Sucesso",
        color: "green",
        message: "Cadastrado com sucesso. Id:" + result.id,
      });
      router.replace("/admin/usuarios");
      return true;
    } catch (result) {
      if (result instanceof Error) {
        notifications.show({
          title: "Erro",
          color: "red",
          message: result + "",
        });
        return false;
      }
      const data = await (result as Response).json();
      notifications.show({
        title: "Erro",
        color: "red",
        message: data.message,
      });
      return false;
    } finally {
      modals.closeAll();
    }
  };
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
            size: "xl",
            // fullScreen: true,
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
      <UsersTable users={users?.content} />
    </Container>
  );
}

export const getServerSideProps = (async (context) => {
  const { token } = JSON.parse(context.req.cookies["user"] || "{}") as LoginRet;
  try {
    const res = await fetchApi("/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const users: Content<User> = await res.json();

    return {
      props: { users },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { users: undefined },
    };
  }
}) satisfies GetServerSideProps<{
  users?: Content<User>;
}>;
