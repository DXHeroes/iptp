import React, { useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthState } from './interfaces/AuthState';
import { Routes } from './routes';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    token: '',
    accountOrder: 0,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setAuth((state) => ({ ...state, token }));
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Routes logged={!!token} />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
