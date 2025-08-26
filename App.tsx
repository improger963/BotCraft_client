
import React, { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BotEditorPage from './pages/BotEditorPage';
import PasswordResetPage from './pages/PasswordResetPage';

// Helper to get route from hash. e.g., #/login -> /login
const getRoute = () => window.location.hash.slice(1) || '/';


const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Router based on URL hash
  const [route, setRoute] = useState(getRoute());

  // Function to navigate by changing the hash
  const navigate = (path: string) => {
    window.location.hash = path;
  };
  
  // Listen to hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check in case there is no hash
    if (window.location.hash === '') {
        navigate('/login');
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Effect to handle redirection based on authentication state
  useEffect(() => {
    if (isAuthenticated && (route === '/login' || route === '/register' || route === '/' || route === '/password-reset')) {
      navigate('/editor');
    } else if (!isAuthenticated && route === '/editor') {
      navigate('/login');
    } else if (route === '/') {
       navigate('/login');
    }
  }, [isAuthenticated, route]);
  
  const renderPage = () => {
    // If authenticated, only show the editor
    if (isAuthenticated) {
        return <BotEditorPage />;
    }

    // If not authenticated, route between login, register, and password reset pages
    switch (route) {
        case '/login':
            return <LoginPage navigate={navigate} />;
        case '/register':
            return <RegisterPage navigate={navigate} />;
        case '/password-reset':
            return <PasswordResetPage navigate={navigate} />;
        default:
            // Redirect to login for any other unknown path when not authenticated
            navigate('/login');
            return <LoginPage navigate={navigate} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center justify-center p-4">
      {renderPage()}
    </div>
  );
};

export default App;