import React, { useState } from 'react';
import './SearchBar.css';

//atenção na ordem dos parâmetros...primeiro é event, aquele de valor default é o último (caso não passado fica undefined)
export const _pesquisar = async (event, setRepos, setUsuario, usuario, request = fetch) => {
    event.preventDefault();
    let url = `https://api.github.com/users/${usuario}/repos`;
    const response = await request(url);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
        setRepos(json);
        setUsuario(json[0].owner);
    } else {
        setRepos([]);
        setUsuario({});
    }
}

//componente funcional
export default (props) => {
    const [usuario, setUsuario] = useState();
    const pesquisar = (event) => {
        _pesquisar(event, props.setRepos, props.setUsuario, usuario)
    }
    return (
        <div className="search">
            <form onSubmit={pesquisar} >
                <input data-testid="input" type="text" placeholder="nome do usuário no github" onChange={(event) => {
                    let usuario = event.target.value;
                    setUsuario(usuario);
                }} />
                <input data-testid="searchButton" type="submit" value="pesquisar" onClick={pesquisar} />
            </form>
        </div>
    );
}
