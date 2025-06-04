// src/components/RegisterForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/authService';
import { UserRole } from '../../interfaces/User';
import { useToast } from '../../context/ToastContext';
import InputField from '../../ui/InputField';
import { Link } from 'react-router-dom';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Required'),
});


const RegisterForm: React.FC = () => {
  const { showToast } = useToast();

  const onSubmitHandler = async (values: RegisterFormValues, { setSubmitting }: any) => {
    const { name, email, password } = values;
    try {
      const res = await register({ name, email, password });
      showToast(`Welcome ${res.data.name}`, 'success');
    } catch (err: any) {
      showToast(err?.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <Formik <RegisterFormValues>
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="name" label="Name" type="text" placeholder="Enter your name" />

            <InputField name="email" label="Email address" type="email" placeholder="Enter your email" />

            <InputField name="password" label="Password" type="password" placeholder="Enter your password" />

            <div className="d-flex justify-content-between mb-3">
              <Link to="/forgot-password" className="small text-decoration-none">Forgot Password?</Link>
              <Link to="/login" className="small text-decoration-none">Login</Link>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
