
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => {
  const errorId = id && error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-2 bg-white border rounded-md text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in-out
          ${error 
            ? 'border-red-400 focus:ring-red-500/30 focus:border-red-500' 
            : 'border-gray-300 focus:ring-blue-500/30 focus:border-blue-600'
          }
          focus:outline-none focus:ring-2`}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};