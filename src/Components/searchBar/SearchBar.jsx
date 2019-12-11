import React, { useContext } from "react";
import { loadingContext } from "../../App";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./SearchBar.module.scss";
import * as yup from "yup";
import { getUser, getReposByUser } from "../../services/index";

const validation = yup.object().shape({
  usuario: yup.string().required("Nenhum nome informado")
});

const initialValues = {
  usuario: ""
};
export const _pesquisar = async (
  showLoading,
  hideLoading,
  nomeUsuario,
  setUsuario,
  setRepos,
  setRepos_max,
  setPage
) => {
  showLoading("Carregando...");

  try {
    const user = await getUser(nomeUsuario);
    const repos = await getReposByUser(nomeUsuario, 1);
    setUsuario(user.data, "OK");
    setRepos_max(user.data.public_repos);
    setRepos(repos.data, "OK");

    setPage(2);
  } catch (error) {
    if (error.response.status === 404) {
      setUsuario(null, "not found");
      setRepos([], "not found");
    }
  }
  hideLoading();
};

const Searchbar = () => {
  const {
    showLoading,
    hideLoading,
    setUsuario,
    setRepos,
    setRepos_max,
    setPage
  } = useContext(loadingContext);

  const pesquisar = usuario => {
    _pesquisar(
      showLoading,
      hideLoading,
      usuario.usuario,
      setUsuario,
      setRepos,
      setRepos_max,
      setPage
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={pesquisar}
        validationSchema={validation}
      >
        <Form>
          <div>
            <Field
              name="usuario"
              className={styles.field_input}
              data-testid="inputNomeUsuario"
              type="text"
              placeholder="nome do usuário no github"
            />
            <Field data-testid="searchButton" type="submit" value="pesquisar" />
          </div>
          <div>
            <ErrorMessage
              className={styles.error}
              component="span"
              name="usuario"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Searchbar;
