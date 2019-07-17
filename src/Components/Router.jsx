import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Perfil from './Perfil'
import RepoList from './RepoList'

export default () => {
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