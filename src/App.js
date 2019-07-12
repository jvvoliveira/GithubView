import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Router from "./Components/Router";
import { BrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading";

export const loadingContext = React.createContext({
  loading: false,
  message: null,
  page: 1,
  showLoading: message => {},
  hideLoading: () => {}
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: { data: [], status: null },
      usuario: { data: undefined, status: null },
      page: 1,
      loading: false,
      message: null
    };
  }

  showLoading = message => {
    this.setState({
      loading: true,
      message
    });
  };

  hideLoading = () => {
    this.setState({ loading: false });
  };

  setRepos = (data, status) => {
    const repos = { data, status };
    this.setState({ repos });
  };

  setUsuario = (data, status) => {
    const usuario = { data, status };
    this.setState({ usuario });
  };
  previousPage = () => {
    if(this.state.page > 1){
      this.setState({ page: this.state.page - 1 }, () => {
        fetch(
          `https://api.github.com/users/${this.state.usuario.data.login}/repos?per_page=8&page=${this.state.page}`
        )
          .then(response => response.json())
          .then(value => {
            if (!value.message) {
              this.setRepos(value, "OK");
            } else {
              this.setRepos([], value.message);
            }
          });
      });
  }
  };
  nextPage = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      fetch(
        `https://api.github.com/users/${this.state.usuario.data.login}/repos?per_page=8&page=${this.state.page + 1}`
      )
        .then(response => response.json())
        .then(value => {
          if (!value.message) {
            this.setRepos(value, "OK");
          } else {
            this.setRepos([], value.message);
          }
        });
    });
  };

  render() {
    const {
      showLoading,
      hideLoading,
      setRepos,
      setUsuario,
      previousPage,
      nextPage
    } = this;

    const value = {
      ...this.state,
      showLoading,
      hideLoading,
      setUsuario,
      setRepos,
      previousPage,
      nextPage
    };

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
