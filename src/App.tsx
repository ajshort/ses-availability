import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Index from './pages/Index';
import Member from './pages/Member';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Index} />
      <Route path="/member" component={Member} />
    </BrowserRouter>
  );
}

export default App;
