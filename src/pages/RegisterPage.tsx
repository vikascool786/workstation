// src/pages/RegisterPage.tsx
import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-8 col-md-4 mx-auto">
        <RegisterForm />
      </div>
    </div>
  </div>
);
export default RegisterPage;
