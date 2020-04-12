import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Perfil from "../Pages/perfil/Perfil";
import RepoList from "../Pages/repoList/RepoList";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={() => <Perfil />}></Route>
      <Route path="/repositorios" component={() => <RepoList />}></Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Router;
