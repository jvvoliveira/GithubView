import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { loadingContext } from '../App';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

export const _pesquisar = async (showLoading, hideLoading, nomeUsuario, page, setUsuario, setRepos, request = fetch) => {
    showLoading('Carregando...')

    const urlRepos = `https://api.github.com/users/${nomeUsuario}/repos?per_page=8&page=${page}`;
    const urlUsuario = `https://api.github.com/users/${nomeUsuario}`;

    await Promise.all([request(urlUsuario), request(urlRepos)]).then((response) => {
        console.log(response[1]);
        Promise.all([response[0].json(), response[1].json()]).then((values) => {
            console.log(values[1]);
            if (!values[0].message) {
                setUsuario(values[0], 'OK')
            } else {
                setUsuario(null, values[0].message)
            }

            if (!values[1].message) {
                setRepos(values[1], 'OK')
            } else {
                setRepos([], values[0].message)
            }
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

    const { showLoading, hideLoading, page, setUsuario, setRepos } = useContext(loadingContext);
    const [nomeUsuario] = useState("");

    const pesquisar = (usuario) => {
        _pesquisar(showLoading, hideLoading, usuario.usuario, page, setUsuario, setRepos)
    }

    return (
        <div className="search">
            <Formik initialValues={nomeUsuario} onSubmit={pesquisar} validationSchema={validation}>
                <Form>
                    <div>
                        <Field name="usuario" id="field-input" data-testid="input" type="text" placeholder="nome do usuário no github" />
                        <Field data-testid="searchButton" type="submit" value="pesquisar" />
                    </div>
                    <div>
                        <ErrorMessage className="error" component="span" name="usuario"/>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
