import React, { useState, useEffect } from 'react'
import './Perfil.css'
export default (props) => {

    const [usuario, setUsuario] = useState('')

    const _pesquisar = async (usuario, request = fetch) => {
        let url = `https://api.github.com/users/${usuario}`
        const response = await request(url)
        console.log(response)
        if (response.status === 200) {
            setUsuario(response)
        } else {
            setUsuario({})
        }
    }

    useEffect(() => {
        // _pesquisar(usuario)
        setUsuario(usuario);
        console.log('conteúdo de usuário: ' + usuario)
    })

    if (usuario !== undefined) {
        return (
            <>
                <h1 className='titulo'>{usuario.name ? usuario.name : usuario.login}</h1>
                <div className='box'>
                    <img src={usuario.avatar_url}></img>
                </div>
                <div className='box'>
                    <h4>Acesse a página do github clicando <a href={usuario.html_url} target="_blank">
                        aqui
                        </a></h4>
                </div>
            </>
        )
    } else {
        return (
            <h2>Usuário não encontrado ou
                <br />sem repositórios públicos</h2>
        )
    }
}