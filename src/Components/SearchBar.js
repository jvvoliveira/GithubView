import React, { useState } from 'react';
import './SearchBar.css';

//componente funcional
export default (props) => {
    const [usuario, setUsuario] = useState();

    const pesquisar = async (event, request = fetch) => {
        event.preventDefault();
        let url = `https://api.github.com/users/${usuario.usuario}/repos`;
        const response = await request(url);
        const json = await response.json();
        console.log(response);
        if (response.status === 200) {
            props.setRepos(json);
        } else {
            props.setRepos([]);
        }
    }

    return (
        <div className="search">
            <form onSubmit={pesquisar} >
                <input data-testid="input" type="text" placeholder="nome do usuário no github" onChange={(event) => {
                    let usuario = event.target.value;
                    setUsuario({usuario});
                }} />
                <input data-testid="searchButton" type="submit" value="pesquisar" onClick={pesquisar} />
            </form>
        </div>
    );
}