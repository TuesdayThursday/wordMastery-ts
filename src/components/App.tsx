import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import Description from './Description';
import { authenticate } from '../unit/Authentication';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [descriptionSite, setDescription] = useState<boolean>(false);


  useEffect(()=>{
    authenticate().then(auth => {
      setIsAuthenticated(auth);
    })
  },[])

  return (
    <div className="App">
      <AppRouter isLoggedIn={isAuthenticated}/>


      <div id="descriptionBtn" onClick={()=>setDescription(!descriptionSite)}>
        ?
      </div>

      {
        descriptionSite ? 
          <Description state={descriptionSite} setState={setDescription} ></Description>
        :
        <></>
      }
    </div>
  );
}

export default App;
