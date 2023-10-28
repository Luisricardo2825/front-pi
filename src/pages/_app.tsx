import "@mantine/core/styles.css";

import { AnimatePresence } from "framer-motion";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { HeaderMenu } from "@/Component/Header";
import { useRouter } from "next/router";
import Check from "./utils/CheckPage";
import { Roboto_Mono } from "next/font/google";

const font = Roboto_Mono({
  subsets: ["latin"],
});

export default function App({ Component, pageProps, router }: AppProps) {
  const Router = useRouter();
  const isNavbarVisible = Check(Router.pathname, "navbar");
  // const isFooterVisible = Check(Router.pathname, "footer");
  return (
    <MantineProvider>
      {isNavbarVisible ? <HeaderMenu /> : null}
      <Notifications />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </MantineProvider>
  );
}
