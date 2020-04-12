import React, { useContext } from "react";
import { loadingContext } from "../../App";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./SearchBar.module.scss";
import * as yup from "yup";
import _pesquisar from "./_pesquisar";

const validation = yup.object().shape({
  usuario: yup.string().required("Nenhum nome informado")
});

const initialValues = {
  usuario: ""
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
