
import React from 'react';
import { GlobeIcon } from '../icons';

interface AuthLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: string | null;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, description, children, error }) => {
  return (
    <div className="w-full max-w-md">
      <div className="p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-blue-500/10">
        <div className="text-center">
          <GlobeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
          {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
        </div>
        {children}
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-center text-red-700 animate-fade-in-fast" role="alert">
          {error}
        </div>
      )}
       <style>{`
          @keyframes fade-in-fast {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-fast {
            animation: fade-in-fast 0.3s ease-out forwards;
          }
      `}</style>
    </div>
  );
};