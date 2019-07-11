import Header from './components/Header';
import Index from './pages/Index';
import Login from './pages/Login';
import Member from './pages/Member';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/member" component={Member} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
