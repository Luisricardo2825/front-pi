import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

import { AnimatePresence } from "framer-motion";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { nprogress, NavigationProgress } from "@mantine/nprogress";
import type { AppProps } from "next/app";
import { HeaderMenu } from "@/Component/Header/Header";
import { useRouter, Router } from "next/router";
import Check from "@/utils/CheckPage";
import { Roboto_Mono } from "next/font/google";
import { Provider } from "jotai";
import React from "react";
import { Footer } from "@/Component/Footer/Footer";
import { myStore } from "@/atoms/auth";

const font = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
});

Router.events.on("routeChangeStart", () => {
  nprogress.start();
});
Router.events.on("routeChangeComplete", () => nprogress.complete());
Router.events.on("routeChangeError", () => nprogress.complete());

export default function App({ Component, pageProps, router }: AppProps) {
  const Router = useRouter();
  const isNavbarVisible = Check(Router.pathname, "navbar");
  const isFooterVisible = Check(Router.pathname, "footer");

  // React.useEffect(() => {
  //   const user = Cookies.get("user");
  //   if (!user) {
  //     notifications.show({
  //       title: "Acesso Negado",
  //       message: "Você precisa estar logado para acessar esta página",
  //     });
  //     Router.push("/login");
  //   }
  // }, []);
  return (
    <Provider store={myStore}>
      <MantineProvider>
        <NavigationProgress color="cyan" />

        {isNavbarVisible ? <HeaderMenu /> : null}
        <Notifications position="top-right" zIndex={1000} />
        <AnimatePresence mode="wait" initial={false}>
          <div className={font.className} key={router.asPath}>
            <Component {...pageProps} />
          </div>
        </AnimatePresence>
        {isFooterVisible ? <Footer /> : null}
      </MantineProvider>
    </Provider>
  );
}
