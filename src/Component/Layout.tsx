import { HTMLMotionProps, Variants, motion } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";

interface IProps extends Omit<Variants, "children"> {}
const Layout: React.FC<PropsWithChildren<IProps>> = ({ children, ...rest }) => {
  return (
    <motion.div variants={rest} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};
export default Layout;
