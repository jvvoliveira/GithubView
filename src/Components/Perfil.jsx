import React, { useContext } from 'react'
import './Perfil.css'
import { loadingContext } from '../App'

export default () => {
    const {usuario} = useContext(loadingContext);

    if (usuario !== undefined) {
        return (
            <>
                <h1 className='title'>{usuario.name ? usuario.name : usuario.login}</h1>
                <div className='box'>
                    <img src={usuario.avatar_url}></img>
                </div>
                <div className='box'>
                    <p>{usuario.bio}</p>
                    <p>{usuario.location}</p>
                    <p>Seguidores: {usuario.followers}</p>
                    <p>Repositórios públicos: {usuario.public_repos}</p>
                    <h4><a href={usuario.html_url} target="_blank">GitHub</a></h4>
                    <p>Criado em: {usuario.created_at}</p>
                </div>
            </>
        )
    } else {
        return (
            <h2>Sem usuário</h2>
        )
    }
}