

import React, { useState, useEffect } from 'react';
import { InputField } from '../components/auth/InputField';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { Checkbox } from '../components/auth/Checkbox';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuthStore } from '../store/authStore';

interface LoginPageProps {
  navigate: (path: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for general (non-field) errors
  const [generalError, setGeneralError] = useState<string | null>(null);
  // State for field-specific errors
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Clear any existing errors when the component mounts or unmounts
    clearError();
    return () => clearError();
  }, [clearError]);
  
  // Effect to process errors from the auth store
  useEffect(() => {
    if (error) {
      if (typeof error === 'string') {
        setGeneralError(error);
        setFieldErrors({});
      } else {
        setFieldErrors(error);
        setGeneralError('Please check the errors below.');
      }
    } else {
      setGeneralError(null);
      setFieldErrors({});
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous errors before a new attempt
    clearError();
    login({ email, password });
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Log in to continue your journey with BotCraft."
      error={generalError}
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
        <InputField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          error={fieldErrors.email}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          error={fieldErrors.password || fieldErrors.credentials} // Handle a generic "credentials" error
        />
        
        <div className="flex items-center justify-between">
          <Checkbox id="remember-me" label="Remember me" />
          <div className="text-sm">
            <a href="#/password-reset" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300" onClick={(e) => { e.preventDefault(); navigate('/password-reset'); }}>
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="pt-2">
          <PrimaryButton type="submit" isLoading={isLoading}>
            Sign in
          </PrimaryButton>
        </div>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="#/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
          Sign up now
        </a>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;