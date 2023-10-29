import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

import { AnimatePresence } from "framer-motion";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { nprogress, NavigationProgress } from "@mantine/nprogress";
import type { AppProps } from "next/app";
import { HeaderMenu } from "@/Component/Header";
import { useRouter, Router } from "next/router";
import Check from "./utils/CheckPage";
import { Roboto_Mono } from "next/font/google";
import { Provider } from "jotai";

const font = Roboto_Mono({
  subsets: ["latin"],
});

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.complete());
Router.events.on("routeChangeError", () => nprogress.complete());

export default function App({ Component, pageProps, router }: AppProps) {
  const Router = useRouter();
  const isNavbarVisible = Check(Router.pathname, "navbar");
  // const isFooterVisible = Check(Router.pathname, "footer");
  return (
    <Provider>
      <MantineProvider>
        <NavigationProgress color="red" />

        {isNavbarVisible ? <HeaderMenu /> : null}
        <Notifications position="top-right" zIndex={1000} />
        <AnimatePresence mode="wait" initial={false}>
          <Component
            {...pageProps}
            key={router.asPath}
            className={font.className}
          />
        </AnimatePresence>
      </MantineProvider>
    </Provider>
  );
}
