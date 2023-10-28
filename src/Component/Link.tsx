import { UnstyledButton } from "@mantine/core";
import type { UnstyledButtonProps } from "@mantine/core";
import NextLink from "next/link";

import type {
  ReactNode,
  FC,
  PropsWithChildren,
  MouseEventHandler,
} from "react";
interface IProps extends UnstyledButtonProps {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}
export default function Link(props: PropsWithChildren<IProps>): ReactNode {
  return <UnstyledButton component={NextLink} {...props} />;
}
