import React, { useContext } from 'react'
import './Perfil.css'
import { loadingContext } from '../App'

export default () => {
    const { data, status } = useContext(loadingContext).usuario;

    if (data !== undefined) {
        if (status == 'OK') {
            return (
                <>
                    <h1 className='title'>{data.name ? data.name : data.login}</h1>
                    <div className='box'>
                        <img src={data.avatar_url}></img>
                    </div>
                    <div className='box'>
                        <p>{data.bio}</p>
                        <p>{data.location}</p>
                        <p>Seguidores: {data.followers}</p>
                        <p>Repositórios públicos: {data.public_repos}</p>
                        <h4><a href={data.html_url} target="_blank">GitHub</a></h4>
                        <p>Criado em: {data.created_at}</p>
                    </div>
                </>
            )
        }else{
            return(
                <h2>Usuário não encontrado</h2>
            )
        }
    } else {
        return (
            <h2>Pesquise por algum usuário que exista no GitHub</h2>
        )
    }
}