import React, { Component } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar'
import NavBar from './Components/NavBar'
import Router from './Components/Router'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      usuario: {}
    }
    this.setRepos = this.setRepos.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
  }

  setRepos(repos) {
    this.setState({ repos });
  }

  setUsuario(usuario) {
    this.setState({ usuario });
  }

  //passando função como prop pro filho...uma maneira de fazer comunicação
  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <NavBar />
            <SearchBar setRepos={this.setRepos} setUsuario={this.setUsuario}/>
            <Router repos={this.state.repos} repos={this.state.repos} usuario={this.state.usuario}/>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
