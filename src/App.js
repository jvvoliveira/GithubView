import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      repos:[]
    }
    this.setRepos = this.setRepos.bind(this);
  }

  setRepos(repos){
    this.setState({repos});
  }

  //passando função como prop pro filho...uma maneira de fazer comunicação
  render() {
    return (
      <div className="App" >
        <SearchBar setRepos={this.setRepos} ></SearchBar> 
        <RepoList repos={this.state.repos} ></RepoList>
      </div>
    );
  }
}

export default App;
