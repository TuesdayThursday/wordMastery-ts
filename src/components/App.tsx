import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


import './App.css';
import AppRouter from './Router';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <div className="App">
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
