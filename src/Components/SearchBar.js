import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { loadingContext } from '../App';

//atenção na ordem dos parâmetros...primeiro é event, aquele de valor default é o último (caso não passado fica undefined)
export const _pesquisar = (event, showLoading, hideLoading, nomeUsuario, setUsuario, setRepos, request = fetch) => {
    event.preventDefault()
    showLoading('Carregando...')

    const urlRepos = `https://api.github.com/users/${nomeUsuario}/repos`;
    const urlUsuario = `https://api.github.com/users/${nomeUsuario}`;

    Promise.all([request(urlUsuario), request(urlRepos)]).then((response) => {
        Promise.all([response[0].json(), response[1].json()]).then((values) => {
            console.log(values[0])
            console.log(values[1])
            if (!values[0].message) {
                setUsuario(values[0], 'OK')
            } else {
                setUsuario(null, values[0].message)
            }

            if (!values[1].message) {
                setRepos(values[1], 'OK')
            } else {
                setRepos([], values[0].message)
            }
        })
    }).then(() => {
        hideLoading()
    }
    )
}

//componente funcional
export default () => {

    const { showLoading, hideLoading, setUsuario, setRepos } = useContext(loadingContext);
    const [nomeUsuario, setNomeUsuario] = useState("");

    const pesquisar = (event) => {
        _pesquisar(event, showLoading, hideLoading, nomeUsuario, setUsuario, setRepos)
    }

    return (
        <div className="search">
            <form onSubmit={pesquisar} >
                <input id="field" data-testid="input" type="text" placeholder="nome do usuário no github" onChange={
                    (event) => {
                        setNomeUsuario(event.target.value)
                    }
                } />
                <input data-testid="searchButton" type="submit" value="pesquisar" />
            </form>
        </div>
    );
}
