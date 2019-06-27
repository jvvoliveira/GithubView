import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { loadingContext } from '../App';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

//atenção na ordem dos parâmetros...primeiro é event, aquele de valor default é o último (caso não passado fica undefined)
export const _pesquisar = async (showLoading, hideLoading, nomeUsuario, setUsuario, setRepos, request = fetch) => {
    showLoading('Carregando...')

    const urlRepos = `https://api.github.com/users/${nomeUsuario}/repos`;
    const urlUsuario = `https://api.github.com/users/${nomeUsuario}`;

    await Promise.all([request(urlUsuario), request(urlRepos)]).then((response) => {
        Promise.all([response[0].json(), response[1].json()]).then((values) => {
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

//componente funcional
export default () => {

    const { showLoading, hideLoading, setUsuario, setRepos } = useContext(loadingContext);
    const [nomeUsuario] = useState("");

    const pesquisar = (nomeUsuario) => {
        _pesquisar(showLoading, hideLoading, nomeUsuario.usuario, setUsuario, setRepos)
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
