
import React from 'react';
import { SpinnerIcon } from '../icons';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, isLoading, disabled, ...props }) => {
  return (
    <button
      className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-white disabled:from-gray-400 disabled:to-gray-500 disabled:text-gray-200 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed transform transition-all duration-300 ease-in-out"
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <SpinnerIcon className="w-5 h-5" />
      ) : (
        children
      )}
    </button>
  );
};