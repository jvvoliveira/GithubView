import React, { Component } from 'react';
import Repo from './Repo';

class RepoList extends Component {

    render() {
        if(this.props.repos.length !== 0){
        return(
            this.props.repos.map(repo => {
                return (
                    <Repo name={repo.name} link={repo.html_url} language={repo.language}
                        description={repo.description}></Repo>
                );
            })
        );
        }else{
            return(
                <h3>Nenhum repositório encontrado</h3>
            );
        }
    }
}

export default RepoList;