// src/pages/LoginPage.tsx
import React from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-8 col-md-4 mx-auto">
        <LoginForm />
      </div>
    </div>
  </div>
);
export default LoginPage;
