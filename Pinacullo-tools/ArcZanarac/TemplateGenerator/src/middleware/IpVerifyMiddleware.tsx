// src/middleware/IpVerifyMiddleware.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type Check = () => Promise<string>;

const ENDPOINTS: Check[] = [
  // 1) Country-is (ultra-leve: 55 B)
  async () => (await fetch('https://api.country.is/')).json().then(r => r.country),
  // 2) GeoJS (caso #1 falhe ou atinja rate-limit)
  async () => (await fetch('https://get.geojs.io/v1/ip/country.json')).json().then(r => r.country),
];

const IpVerifyMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      for (const fn of ENDPOINTS) {
        try {                   // tenta até conseguir resposta válida
          const code = await fn();
          setAllowed(code === 'BR');
          console.log(code)
          return;
        } catch { /* próximo endpoint */ }
      }
      setAllowed(false);        // todos falharam → bloqueia
    })();
  }, []);
    if(allowed === null) return <p>Verificando IP...</p>
    if(!allowed) return <p> Acesso bloqueado: somente Brasil</p>
    return <>{children}</>;

}

export default IpVerifyMiddleware;
