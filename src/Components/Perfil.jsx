import React, { useState, useEffect, useContext } from 'react'
import './Perfil.css'
import { loadingContext } from '../App';

export default (props) => {

    const [usuario, setUsuario] = useState(undefined)
    const {showLoading, hideLoading} = useContext(loadingContext)

    const pesquisar = async (url, request = fetch) => {
        const response = await request(url);
        const json = await response.json();
        if (response.status == 200) {
            console.log(json)
            await setUsuario(json)
        }
        else {
            setUsuario({})
        }
    }
    useEffect(() => {
        if (props.usuario.url) {
            alert('useEffect chamado')
            showLoading('Carregando perfil do usuário...')
            pesquisar(props.usuario.url)
            hideLoading()
        }
    }, []); //useEffect executando apenas na montagem inicial

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
            <h2>Sem usuário ou<br />
                sem repositórios públicos</h2>
        )
    }
}