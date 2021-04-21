import React from "react";
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddBootcamp from "../components/bootcamps/AddBootcamp";
import Bootcamps from "../components/bootcamps/Bootcamps";
import SingleBootcamp from "../components/bootcamps/SingleBootcamp";
import AddCourse from "../components/courses/AddCourse";
import { history } from "../helpers/history";
function Dashboard() {
  return (
    <Router history={history}>

      {/* <Sidebar /> */}
      <Switch>

        <Route path="/" component={Bootcamps} />
        {/* <Route path="/addBootcamp" component={AddBootcamp} />
        <Route path="/addCourse" component={AddCourse} />
        <Route path="/singleBootcamp" component={SingleBootcamp} /> */}
      </Switch>
    </Router>
  );
}

export default Dashboard;