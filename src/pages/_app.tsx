import "@mantine/core/styles.css";

import { MantineProvider, ScrollArea } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { HeaderMenu } from "@/Component/Header";
import classes from "./Global.module.css";
import { useRouter } from "next/router";
import Check from "./utils/CheckPage";

export default function App({ Component, pageProps }: AppProps) {
  const Router = useRouter();
  const isNavbarVisible = Check(Router.pathname, "navbar");
  // const isFooterVisible = Check(Router.pathname, "footer");
  return (
    <MantineProvider>
      {isNavbarVisible ? <HeaderMenu /> : null}
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
