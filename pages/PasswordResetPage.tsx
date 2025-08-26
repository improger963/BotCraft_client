
import React, { useState } from 'react';
import { InputField } from '../components/auth/InputField';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { AuthLayout } from '../components/auth/AuthLayout';
import { apiRequestPasswordReset, ApiError } from '../services/authService';

interface PasswordResetPageProps {
  navigate: (path: string) => void;
}

const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Separate states for general and field-specific errors
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    if (!email) {
      setFieldErrors({ email: 'Please enter your email address.' });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequestPasswordReset(email);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError && err.fields) {
        setFieldErrors(err.fields);
        setGeneralError('Please correct the errors below.');
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset your password" error={generalError}>
      {submitted ? (
        <div className="text-center">
          <p className="text-gray-300">
            If an account with that email exists, we've sent instructions to reset your password.
          </p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
          <p className="text-sm text-gray-400">
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
      <p className="mt-6 text-center text-sm text-gray-400">
        Remembered your password?{' '}
        <a href="#/login" className="font-medium text-cyan-400 hover:text-cyan-300" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
};

export default PasswordResetPage;