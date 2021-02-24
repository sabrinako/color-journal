import { AuthProvider } from '../contexts/AuthContext';
import { NewMoodProvider } from '../contexts/NewMoodContext'
import Dashboard from './Home/Dashboard'
import Login from './Login'
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup} />
          </Switch>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
          <Switch>
            <NewMoodProvider>
              <PrivateRoute exact path="/" component={Dashboard} />
            </NewMoodProvider>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
