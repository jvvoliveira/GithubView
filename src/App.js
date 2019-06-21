import React, { Component } from 'react'
import './App.css'
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
      repos: { data: [], status: null },
      usuario: { data: undefined, status: null },
      loading: false,
      message: null
    }
  }

  showLoading = message => {
    this.setState({
      loading: true,
      message
    })
  }

  hideLoading = () => { 
    this.setState({ loading: false }) 
  }

  setRepos = (data, status) => {
    const repos = { data, status }
    this.setState({ repos })
  }

  setUsuario = (data, status) => {
    const usuario = { data, status }
    this.setState({ usuario })
  }

  render() {
    const { showLoading, hideLoading, setRepos, setUsuario } = this

    const value = {
      ...this.state,
      showLoading,
      hideLoading,
      setUsuario,
      setRepos
    }

    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <loadingContext.Provider value={value}>
              <NavBar />
              <Loading />
              <Router />
            </loadingContext.Provider>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
