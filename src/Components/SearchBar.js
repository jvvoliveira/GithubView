import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { loadingContext } from '../App';

//atenção na ordem dos parâmetros...primeiro é event, aquele de valor default é o último (caso não passado fica undefined)
export const _pesquisar = (event, nomeUsuario, setUsuario, setRepos, request = fetch) => {
    event.preventDefault();

    const urlRepos = `https://api.github.com/users/${nomeUsuario}/repos`;
    const urlUsuario = `https://api.github.com/users/${nomeUsuario}`;

    Promise.all([request(urlUsuario), request(urlRepos)]).then((response) => {
        Promise.all([response[0].json(), response[1].json()]).then((values) => {
            if(values[0].message != 'Not Found'){
                setUsuario(values[0], 'OK')
            }else{
                setUsuario(null, 'Not Found')
            }
            
            if(values[1].message != 'Not Found'){
                setRepos(values[1], 'OK')
            }else{
                setRepos([], values[1].message)
            }
            
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
