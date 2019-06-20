import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { loadingContext } from '../App';

//atenção na ordem dos parâmetros...primeiro é event, aquele de valor default é o último (caso não passado fica undefined)
export const _pesquisar = (event, nomeUsuario, setUsuario, setRepos, request = fetch) => {
    event.preventDefault();

    const urlRepos = `https://api.github.com/users/${nomeUsuario}/repos`;
    const urlUsuario = `https://api.github.com/users/${nomeUsuario}`;

    Promise.all([request(urlUsuario), request(urlRepos)]).then((values) => {
        Promise.all([values[0].json(), values[1].json()]).then((valores) => {
            setUsuario(valores[0])
            setRepos(valores[1])
        })
    })
}

//componente funcional
export default () => {

    const { showLoading, hideLoading, setUsuario, setRepos } = useContext(loadingContext);
    const [nomeUsuario, setNomeUsuario] = useState("");

    const pesquisar = (event) => {
        showLoading('Carregando...')
        _pesquisar(event, nomeUsuario, setUsuario, setRepos)
        hideLoading()
    }

    return (
        <div className="search">
            <form onSubmit={pesquisar} >
                <input id="field" data-testid="input" type="text" placeholder="nome do usuário no github" onChange={ 
                    (event) =>{
                        setNomeUsuario(event.target.value)
                    }
                }/>
                <input data-testid="searchButton" type="submit" value="pesquisar" />
            </form>
        </div>
    );
}
