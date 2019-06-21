import React, { useContext } from 'react';
import Repo from './Repo';
import { loadingContext } from '../App';

export default () => {

    const { data, status } = useContext(loadingContext).repos;


    if (status == 'OK') {
        if (data.length !== 0) {
            return (
                data.map(repo => {
                    return (
                        <Repo name={repo.name} link={repo.html_url} language={repo.language}
                            description={repo.description}></Repo>
                    );
                })
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
