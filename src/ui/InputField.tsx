// src/components/common/InputField.tsx
import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mb-3 position-relative">
      <label htmlFor={name} className="form-label">{label}</label>

      <div className="input-group">
        <Field
          id={name}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          className="form-control"
        />
        {isPassword && (
          <span
            className="input-group-text"
            role="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer' }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        )}
      </div>

      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  );
};

export default InputField;
