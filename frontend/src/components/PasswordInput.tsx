import React, { useState } from 'react';
import { MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  className = '',
  placeholder
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <MDBInput
        label={label}
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
        placeholder={placeholder}
      />
      <MDBBtn
        color="link"
        onClick={togglePasswordVisibility}
        type="button"
        style={{ 
          position: 'absolute', 
          right: '0.75rem', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          zIndex: 10,
          border: 'none',
          background: 'transparent',
          color: '#6c757d',
          padding: '0.25rem'
        }}
      >
        <MDBIcon 
          fas 
          icon={showPassword ? 'eye-slash' : 'eye'} 
        />
      </MDBBtn>
    </div>
  );
};

export default PasswordInput;
