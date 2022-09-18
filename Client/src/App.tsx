import React from 'react';
import { Routes,  Route } from 'react-router-dom';
import Word from "./pages/Word"

import './App.css';
function App() {
  return (
    <div className="App">
     <Routes>
       <Route path='/' element={<Word />}></Route>
     </Routes>
    </div>
  );
}


export default App;
