// src/components/auth/LoginForm.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import InputField from "../../ui/InputField";
import { Link } from "react-router-dom";

interface RegisterFormValues {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const { loginUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmitHandler = async (
    values: RegisterFormValues,
    { setSubmitting }: any
  ) => {
    const { email, password } = values;
    try {
      const res = await login(values);
      loginUser(res.data);
      showToast(`Welcome ${res.data.role}`, "success");
      console.log("Login success, navigating...");
      navigate("/dashboard");
      // navigate('/dashboard');
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Login failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "admin@gmail.com", password: "admin123" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={onSubmitHandler}
    >
      <Form className="card shadow p-4 border-0">
        <h4 className="text-center mb-3">Login</h4>

        <InputField
          name="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <div className="d-flex justify-content-between mb-3">
          <Link to="/forgot-password" className="small text-decoration-none">
            Forgot Password?
          </Link>
          <Link to="/register" className="small text-decoration-none">
            Register
          </Link>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
