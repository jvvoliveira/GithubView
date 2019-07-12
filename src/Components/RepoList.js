import React, { useContext } from 'react';
import Repo from './Repo';
import { loadingContext } from '../App';
import styles from './RepoList.module.scss';

export default () => {

    const { data, status } = useContext(loadingContext).repos;

    const list = data.map(repo => {
        return (
            <Repo name={repo.name} link={repo.html_url} language={repo.language}
                description={repo.description}></Repo>
        );
    })

    if (status === 'OK') {
        if (data.length !== 0) {
            return (
                <div className={styles.lista}>
                    {list}
                </div>
            );
        } else {
            return (
                <h2>Usuário sem repositórios públicos</h2>
            );
        }
    }
    else{
        return(
            <h2>Repositórios não encontrados</h2>
        )
    }
}
