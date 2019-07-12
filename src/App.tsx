import Header from './components/Header';
import Index from './pages/Index';
import Login from './pages/Login';
import Member from './pages/Member';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom';

interface AppRouteProps extends RouteProps {
  title: string;
  isProtected?: boolean;
}

const AppRoute: React.FC<AppRouteProps> = ({ title, isProtected, ...props }) => {
  useEffect(() => {
    document.title = `${title} | SES Availability`;
  });

  return <Route {...props} />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <AppRoute path="/" title="Home" exact isProtected component={Index} />
        <AppRoute path="/member" title="Member" isProtected component={Member} />
        <AppRoute path="/login" title="Login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
