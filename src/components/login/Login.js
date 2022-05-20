import React from "react";
import Dashboard from "../layout/Dashboard";
import SignInForm from "./SignInForm";

const Login = () => {
  return (
    <Dashboard
      smallText="Join our platform to predict your future! ✨🚀"
      header="Welcome!"
    >
      <SignInForm />
    </Dashboard>
  );
};

export default Login;
