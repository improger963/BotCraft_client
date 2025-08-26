
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
        className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300">
        {label}
      </label>
    </div>
  );
};