import React, { Component } from 'react';
import Repo from './Repo';

class RepoList extends Component {

    render() {
        return (
            this.props.repos.map(repo => {
                return (
                    <Repo name={repo.name} link={repo.html_url} language={repo.language}
                        description={repo.description}></Repo>
                );
            })
        );
    }
}

export default RepoList;