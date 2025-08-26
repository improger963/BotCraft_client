

import React, { useState, useEffect } from 'react';
import { InputField } from '../components/auth/InputField';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuthStore } from '../store/authStore';

interface PasswordResetPageProps {
  navigate: (path: string) => void;
}

const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ navigate }) => {
  const { requestPasswordReset, isLoading, error, passwordResetSuccess, resetPasswordStatus } = useAuthStore();
  const [email, setEmail] = useState('');
  
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Reset status when component mounts and unmounts to clear previous state
    resetPasswordStatus();
    return () => resetPasswordStatus();
  }, [resetPasswordStatus]);
  
  useEffect(() => {
    if (error) {
      if (typeof error === 'string') {
        setGeneralError(error);
        setFieldErrors({});
      } else {
        setFieldErrors(error as Record<string, string>);
        setGeneralError('Please correct the errors below.');
      }
    } else {
      setGeneralError(null);
      setFieldErrors({});
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestPasswordReset(email);
  };

  return (
    <AuthLayout title="Reset your password" error={generalError}>
      {passwordResetSuccess ? (
        <div className="text-center">
          <p className="text-gray-600">
            If an account with that email exists, we've sent instructions to reset your password.
          </p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
          <p className="text-sm text-gray-500">
            Enter your email address and we will send you a link to reset your password.
          </p>
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

          <div>
            <PrimaryButton type="submit" isLoading={isLoading}>
              Send reset link
            </PrimaryButton>
          </div>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-gray-500">
        Remembered your password?{' '}
        <a href="#/login" className="font-medium text-blue-600 hover:text-blue-500" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
};

export default PasswordResetPage;