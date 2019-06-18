import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Perfil from './Perfil'
import RepoList from './RepoList'


export default (props) => {
    return (
        <Switch>
            <Route path='/' exact={true} 
                component={() => <Perfil usuario={props.usuario} />}
            ></Route>
            <Route path='/repositorios'
                component={() => <RepoList repos={props.repos} />}
            ></Route>
        </Switch>
    )
}