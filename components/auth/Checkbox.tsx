import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-2 focus:ring-offset-0 focus:ring-cyan-600 focus:ring-offset-gray-900"
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-300 hover:text-white transition-colors duration-300">
        {label}
      </label>
    </div>
  );
};