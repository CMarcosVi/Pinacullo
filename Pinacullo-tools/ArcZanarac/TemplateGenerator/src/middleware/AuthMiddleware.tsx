// src/middleware/AuthMiddleware.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthMiddleware = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      setAuthorized(false);
      return;
    }

    fetch('http://localhost/verify.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => setAuthorized(data.success))
      .catch(() => setAuthorized(false));
  }, [location.pathname]);

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  if (authorized === null) return <p>Verificando sessão...</p>;

  if (!authorized && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
