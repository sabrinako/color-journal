import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { NewMoodProvider } from '../contexts/NewMoodContext';
import Dashboard from './Home/Dashboard';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Router forceRefresh>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup} />
          </Switch>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
          <Switch>
            <NewMoodProvider>
              <Route exact path="/">
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </Route>
            </NewMoodProvider>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
