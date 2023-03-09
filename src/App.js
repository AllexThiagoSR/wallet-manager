import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <main className="main-container">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </main>
  );
}

export default App;
