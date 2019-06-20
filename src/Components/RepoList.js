import React, { useContext } from 'react';
import Repo from './Repo';
import { loadingContext } from '../App';

export default () => {

    const { repos } = useContext(loadingContext);

    if (repos.length !== 0) {
        return (
            repos.map(repo => {
                return (
                    <Repo name={repo.name} link={repo.html_url} language={repo.language}
                        description={repo.description}></Repo>
                );
            })
        );
    } else {
        return (
            <h3>Nenhum repositório encontrado</h3>
        );
    }
}
