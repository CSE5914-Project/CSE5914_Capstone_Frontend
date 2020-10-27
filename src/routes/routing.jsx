import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeLayout from "../components/HomeLayout/index";
import ProfilePage from "../components/MovieProfile/index";
import SignInUp from "../components/SignInUp/index";
import Page404 from "../components/404/index";

const Web = (props) => (
  <Switch>
    <Route exact path="/" render={() => <SignInUp setUser={props.setUser} />} />
    <Route exact path="/home" render={() => <HomeLayout user={props.user} />} />
    <Route exact path="/movie/:id" component={ProfilePage} />
    <Route component={Page404} />
  </Switch>
);

export default Web;
