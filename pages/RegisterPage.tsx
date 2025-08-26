
import React, { useState, useEffect } from 'react';
import { InputField } from '../components/auth/InputField';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuthStore } from '../store/authStore';

interface RegisterPageProps {
  navigate: (path: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const { register, isLoading, error, clearError } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
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
        setGeneralError('Please correct the errors below.');
      }
    } else {
      setGeneralError(null);
      setFieldErrors({});
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous errors
    clearError();
    setFieldErrors({});
    setGeneralError(null);

    // Client-side validation first
    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }
    register({ username, email, password });
  };

  return (
    <AuthLayout 
      title="Create Your Account" 
      description="Join BotCraft and start building the future."
      error={generalError}
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
        <InputField
          id="username"
          label="Username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          error={fieldErrors.username}
        />
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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          error={fieldErrors.password}
        />
         <InputField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          error={fieldErrors.confirmPassword}
        />
        
        <div className="pt-2">
          <PrimaryButton type="submit" isLoading={isLoading}>
            Create account
          </PrimaryButton>
        </div>
      </form>
      <p className="mt-8 text-center text-sm text-gray-400">
        Already a member?{' '}
        <a href="#/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;