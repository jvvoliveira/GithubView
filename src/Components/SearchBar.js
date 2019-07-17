import React, { useContext, useState } from 'react';
import { loadingContext } from '../App';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './SearchBar.module.scss';
import * as yup from 'yup';

export const _pesquisar = async (showLoading, hideLoading, nomeUsuario, setUsuario, setRepos, setRepos_max, setPage, request = fetch) => {
    showLoading('Carregando...');

    const urlRepos = `https://api.github.com/users/${nomeUsuario}/repos?per_page=8&page=1`;
    const urlUsuario = `https://api.github.com/users/${nomeUsuario}`;

    Promise.all([request(urlUsuario), request(urlRepos)]).then((response) => {
        Promise.all([response[0].json(), response[1].json()]).then((values) => {
            if (!values[0].message) {
                setUsuario(values[0], 'OK');
            } else {
                setUsuario(null, values[0].message);
            }

            if (!values[1].message) {
                setRepos(values[1], 'OK');
                setRepos_max(values[0].public_repos);
            } else {
                setRepos([], values[1].message);
            }
            setPage(2);
        })
    }).then(() => {
        hideLoading()
    }
    )
}
const validation = yup.object().shape({
    usuario: yup.string().required("Nenhum nome informado")
})

export default () => {

    const { showLoading, hideLoading, setUsuario, setRepos, setRepos_max, setPage } = useContext(loadingContext);
    const [nomeUsuario] = useState("");

    const pesquisar = (usuario) => {
        _pesquisar(showLoading, hideLoading, usuario.usuario, setUsuario, setRepos, setRepos_max, setPage)
    }

    return (
        <div>
            <Formik initialValues={nomeUsuario} onSubmit={pesquisar} validationSchema={validation}>
                <Form>
                    <div>
                        <Field name="usuario" className={styles.field_input} data-testid="input" type="text" placeholder="nome do usuário no github" />
                        <Field data-testid="searchButton" type="submit" value="pesquisar" />
                    </div>
                    <div>
                        <ErrorMessage className={styles.error} component="span" name="usuario"/>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
