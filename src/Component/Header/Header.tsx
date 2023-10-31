"use client";
import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Flex,
  Avatar,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogin2 } from "@tabler/icons-react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "@/Component/Link";
import React, { ReactNode } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { notifications } from "@mantine/notifications";

type Links = { link: string; label: ReactNode; links?: Links[] };
const links: Links[] = [
  { link: "/carros", label: "Carros" },
  {
    link: "/login",
    label: (
      <Flex align={"center"} c={"gray.6"}>
        <IconLogin2 />
        Entrar
      </Flex>
    ),
  },
  {
    link: "/register",
    label: (
      <Flex align={"center"} c={"red.6"}>
        Registrar
      </Flex>
    ),
  },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const filteredItems = links.filter((item) => {
    if (isClient && user) {
      return !["/login", "/register"].includes(item.link);
    } else {
      return true;
    }
  });
  const items = filteredItems.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.link}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.link} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Link href="/">
            <Image
              src="https://i.pinimg.com/originals/80/62/91/8062916a4f4591a810acf489261eab44.png"
              alt="logo"
              width={100}
              height={50}
            />
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}

            {isClient && user ? (
              <Menu
                trigger="hover"
                transitionProps={{ exitDuration: 0 }}
                withinPortal
              >
                <Menu.Target>
                  <Center>
                    <Avatar radius="xl" size={"sm"} />
                    <Text>{user.name.slice(0, 15)}</Text>
                    <IconChevronDown size="0.9rem" stroke={1.5} />
                  </Center>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link href="/carros/new">Novo Carro</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/profile">Perfil</Link>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setUser(undefined);
                      Cookies.remove("user");
                      router.push("/");
                      notifications.show({
                        message: "Deslogado com sucesso",
                        color: "green",
                      });
                      return;
                    }}
                  >
                    Sair
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : null}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
