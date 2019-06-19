import React, { Component } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar'
import NavBar from './Components/NavBar'
import Router from './Components/Router'
import { BrowserRouter } from 'react-router-dom'
import Loading from './Components/Loading'


export const loadingContext = React.createContext({
  loading: false,
  message: null,
  showLoading: message => { },
  hideLoading: () => { }
})


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      usuario: {},
      loading: false,
      message: null
    }

    this.setRepos = this.setRepos.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
  }

  showLoading = message => {
    this.setState({
      loading: true,
      message
    })
  }

  hideLoading = () => { this.setState({ loading: false }) }

  setRepos(repos) {
    this.setState({ repos });
  }

  setUsuario(usuario) {
    this.setState({ usuario });
  }


  //passando função como prop pro filho...uma maneira de fazer comunicação
  render() {
    const { showLoading, hideLoading } = this

    const value = {
      ...this.state,
      showLoading,
      hideLoading
    }

    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <loadingContext.Provider value={value}>
                <NavBar />
                <SearchBar setRepos={this.setRepos} setUsuario={this.setUsuario}/>
                <Loading/>
                <Router repos={this.state.repos} usuario={this.state.usuario}/>
            </loadingContext.Provider>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
