"use client";
import { Menu, Group, Center, Burger, Container, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogin2 } from "@tabler/icons-react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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

  const items = links.map((link) => {
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
          <Link href="/" scroll={false}>
            <Image
              src="https://i.pinimg.com/originals/80/62/91/8062916a4f4591a810acf489261eab44.png"
              alt="logo"
              width={100}
              height={50}
            />
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
