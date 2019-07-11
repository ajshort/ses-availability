import Index from './pages/Index';
import Login from './pages/Login';
import Member from './pages/Member';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Index} />
      <Route path="/member" component={Member} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default App;
