import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FrontPage from './components/FrontPage';
import Login from './components/Login';
import Register from './components/Register';
import BoardUser from './components/BoardUser';
import BoardAdmin from './components/BoardAdmin';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import CheckboxExample from './components/CheckboxExample';

import AddBootcamp from './components/bootcamps/AddBootcamp';
import SingleBootcamp from './components/bootcamps/SingleBootcamp';
import AddCourse from './components/courses/AddCourse';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';
import { history } from './helpers/history';

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log('curentuser');
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Router history={history}>
        <div>
          <Navbar />
          <div className='container mt-3'>
            <Switch>
              <Route exact path={['/', '/home']} component={FrontPage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route path='/user' component={BoardUser} />
              <Route path='/admin' component={BoardAdmin} />
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route path='/addBootcamp' component={AddBootcamp} />
              <Route path='/addCourse' component={AddCourse} />
              <Route path='/singleBootcamp' component={SingleBootcamp} />
              <Route path='/checkboxExample' component={CheckboxExample} />
              <Dashboard />
            </Switch>
          </div>
        </div>
      </Router>
    </BrowserRouter>
  );
};

export default App;
