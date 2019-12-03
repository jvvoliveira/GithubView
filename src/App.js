import React, { Component } from "react";
import styles from "./App.module.scss";
import NavBar from "./Components/navBar/NavBar";
import Router from "./Components/Router";
import { BrowserRouter } from "react-router-dom";
import Loading from "./Components/loading/Loading";

export const loadingContext = React.createContext({
  loading: false,
  message: null,
  page: 1,
  repos_max: undefined,
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
      repos_max: undefined,
      loading: false,
      message: null
    };
  }

  setPage = page => this.setState({ page });

  setRepos_max = repos_max => this.setState({ repos_max });

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

  render() {
    const {
      showLoading,
      hideLoading,
      setRepos,
      setUsuario,
      setPage,
      setRepos_max
    } = this;

    const value = {
      ...this.state,
      showLoading,
      hideLoading,
      setUsuario,
      setRepos,
      setPage,
      setRepos_max
    };
    
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <loadingContext.Provider value={value}>
              <NavBar />
              <Loading />
              <div className={styles.bodyItems}>
                <Router />
              </div>
            </loadingContext.Provider>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
