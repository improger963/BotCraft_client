import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => {
  const errorId = id && error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-2 bg-gray-900/70 border rounded-md text-white placeholder-gray-500 transition-all duration-300 ease-in-out
          ${error 
            ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' 
            : 'border-gray-700 focus:ring-cyan-400/30 focus:border-cyan-400'
          }
          focus:outline-none focus:ring-2`}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};