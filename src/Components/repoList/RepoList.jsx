import React, { useContext } from "react";
import Repo from "./repositorio/Repo";
import { loadingContext } from "../../App";
import styles from "./RepoList.module.scss";
import { getReposByUser } from "../../services";

export const moreItens = async (usuario, page, setRepos, repos, setPage) => {
  try {
    const responseRepos = await getReposByUser(usuario.data.login, page);
    setRepos([...repos.data, ...responseRepos.data], "OK");
    setPage(page + 1);
  } catch (error) {
    setRepos([], error.response.message);
  }
};

export const viewMore = (page, pages, usuario, setRepos, repos, setPage) => {
  const _moreItens = () => {
    moreItens(usuario, page, setRepos, repos, setPage);
  };
  if (page < pages) {
    return (
      <div
        data-testid="viewMore"
        className={styles.viewMore}
        onClick={_moreItens}
      >
        <h3>Ver mais</h3>
      </div>
    );
  } else {
    return (
      <div data-testid="allRepos" className={styles.viewMore}>
        <h3>Esses são todos os repositórios públicos</h3>
      </div>
    );
  }
};

const RepoList = () => {
  const { repos, page, usuario, setRepos, setPage, repos_max } = useContext(
    loadingContext
  );
  let pages = repos_max / 8;
  if (repos_max % 8 > 0) {
    pages++;
  } //8 repositórios por página
  const list = repos.data.map((repo, index) => {
    return (
      <Repo
        name={repo.name}
        link={repo.html_url}
        language={repo.language}
        description={repo.description}
        key={repo.html_url}
        index={index}
      />
    );
  });

  if (repos.status === "OK") {
    if (repos.data.length !== 0) {
      return (
        <div className={styles.lista_infinita}>
          {list}
          {viewMore(page, pages, usuario, setRepos, repos, setPage)}
        </div>
      );
    } else {
      return (
        <h2 data-testid="repositoriosVazio">
          Usuário sem repositórios públicos
        </h2>
      );
    }
  } else {
    return <h2 data-testid="semRepositorio">Repositórios não encontrados</h2>;
  }
};

export default RepoList;
