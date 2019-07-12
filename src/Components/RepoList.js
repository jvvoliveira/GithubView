import React, { useContext } from "react";
import Repo from "./Repo";
import { loadingContext } from "../App";
import styles from "./RepoList.module.scss";

export default () => {
  const { repos, previousPage, nextPage} = useContext(
    loadingContext
  );

  const list = repos.data.map(repo => {
    return (
      <Repo
        name={repo.name}
        link={repo.html_url}
        language={repo.language}
        description={repo.description}
      />
    );
  });

  if (repos.status === "OK") {
    if (repos.data.length !== 0) {
      return (
        <div>
          <div className={styles.lista}>{list}</div>
          <div className={styles.wrapper_btns}>
            <button onClick={previousPage}>Anterior</button>
            <button onClick={nextPage}>Próxima</button>
          </div>
        </div>
      );
    } else {
      return <h2>Usuário sem repositórios públicos</h2>;
    }
  } else {
    return <h2>Repositórios não encontrados</h2>;
  }
};
