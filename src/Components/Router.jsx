import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Perfil from './perfil/Perfil'
import RepoList from './repositorio/repoList/RepoList'

const Router =  () => {
    return (
        <Switch>
            <Route path='/' exact={true} 
                component={() => <Perfil />}
            ></Route>
            <Route path='/repositorios'
                component={() => <RepoList />}
            ></Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default Router;