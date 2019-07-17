import React, { useContext } from "react";
import Repo from "./Repo";
import { loadingContext } from "../App";
import styles from "./RepoList.module.scss";

const { repos, page, usuario, setRepos, setPage, repos_max } = useContext(
  loadingContext
);

export const moreItens = (usuario, page, setRepos, repos, setPage) => {
  fetch(
    `https://api.github.com/users/${
      usuario.data.login
    }/repos?per_page=8&page=${page}`
  )
    .then(response => response.json())
    .then(value => {
      if (!value.message) {
        setRepos([...repos.data, ...value], "OK");
      } else {
        setRepos([], value.message);
      }
    });
  setPage(page + 1);
};

const _moreItens = () => {
  moreItens(usuario, page, setRepos, repos, setPage);
};

export const viewMore = pages => {
  if (page <= pages) {
    return (
      <div className={styles.viewMore} onClick={_moreItens}>
        <h3>Ver mais</h3>
      </div>
    );
  } else {
    return (
      <div className={styles.viewMore}>
        <h3>Esses são todos os repositórios públicos</h3>
      </div>
    );
  }
};

export default () => {
  //8 repositórios por página
  const _viewMore = (pages = repos_max / 8) => {
    viewMore(pages);
  };
  const list = repos.data.map(repo => {
    return (
      <Repo
        name={repo.name}
        link={repo.html_url}
        language={repo.language}
        description={repo.description}
        key={repo.html_url}
      />
    );
  });

  if (repos.status === "OK") {
    if (repos.data.length !== 0) {
      return (
        <div className={styles.lista_infinita}>
          {list}
          {_viewMore()}
        </div>
      );
    } else {
      return <h2>Usuário sem repositórios públicos</h2>;
    }
  } else {
    return <h2>Repositórios não encontrados</h2>;
  }
};
