import "@mantine/core/styles.css";

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

export default function App({ Component, pageProps }: AppProps) {
  const Router = useRouter();
  const isNavbarVisible = Check(Router.pathname, "navbar");
  // const isFooterVisible = Check(Router.pathname, "footer");
  return (
    <MantineProvider>
      {isNavbarVisible ? <HeaderMenu /> : null}
      <Notifications />
      <div className={font.className}>
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
}
