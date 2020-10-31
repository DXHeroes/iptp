import React from 'react';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes logged={false} />
    </div>
  );
};

export default App;
