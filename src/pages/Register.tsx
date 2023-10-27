import RegisterForm from "@/Component/Register";
import Head from "next/head";
import React from "react";

const Register: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterForm />
    </div>
  );
};
export default Register;
