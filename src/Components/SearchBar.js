import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: ""
        }
    }

    //via arrow function não precisamos alterar o bind de contexto
    //declaramos como queremos fazer o request (default = fetch()), bom para os testes
    pesquisar = async (event, request = fetch) =>{ 
        event.preventDefault();
        let url = `https://api.github.com/users/${this.state.usuario}/repos`;
        const response = await request(url);
        const json = await response.json();
        console.log(response);
        if(response.status === 200){
            this.props.setRepos(json);
        }else{
            this.props.setRepos([]);
        }
        // .then(resposta => {
        //     return resposta.json().then(json => {
        //         this.props.setRepos(json);
        //     })
        // });
    }


    render() {
        return (
            <div className="search">
                <form onSubmit={this.pesquisar} >
                <input data-testid="input" type="text" placeholder="nome do usuário no github" onChange={(event) => {
                    let usuario = event.target.value;
                    this.setState({ usuario });
                }} />
                <input data-testid="searchButton" type="submit" value="pesquisar" onClick={this.pesquisar} />
                </form>
            </div>
        );
    }
}

export default SearchBar;