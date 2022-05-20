import React from "react";
import Dashboard from "../layout/Dashboard";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <Dashboard
      smallText="Join our platform to predict your future! ✨🚀"
      header="Welcome!"
    >
      <SignUpForm />
    </Dashboard>
  );
};

export default SignUp;
