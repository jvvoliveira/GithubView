import React from 'react'
import styles from './NavBar.module.scss'
import { Link } from 'react-router-dom'
export default () => {
    return (
        <ul className={styles.navList}>
            <ul>
                <li className={styles.item}><Link to='/'>Perfil</Link></li>
                <li className={styles.item}><Link to='/repositorios'>Repositórios</Link></li>
            </ul>
        </ul>
    )
}