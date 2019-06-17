import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
export default () => {
    return (
        <ul className='navList'>
            <ul>
                <li className='item'><Link to='/'>Perfil</Link></li>
                <li className='item'><Link to='/repositorios'>Repositórios</Link></li>
            </ul>
        </ul>
    )
}