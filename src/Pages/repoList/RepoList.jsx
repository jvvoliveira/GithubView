import React, { useContext } from "react";
import Repositorio from "./repositorio/Repositorio";
import { loadingContext } from "../../App";
import styles from "./RepoList.module.scss";
import { getReposByUser } from "../../services";
import EmptyContent from "../../Components/emptyContent/EmptyContent";

const moreItens = async (usuario, page, setRepos, repos, setPage) => {
  try {
    const responseRepos = await getReposByUser(usuario.data.login, page);
    setRepos([...repos.data, ...responseRepos.data], "OK");
    setPage(page + 1);
  } catch (error) {
    console.log(error);
  }
};

const ViewMore = (props) => {
  const { page, pages, usuario, setRepos, repos, setPage } = props;
  const _moreItens = () => {
    moreItens(usuario, page, setRepos, repos, setPage);
  };

  if (page > pages)
    return (
      <div data-testid="allRepos" className={styles.viewMore}>
        <h3>Esses são todos os repositórios públicos</h3>
      </div>
    );

  return (
    <div
      data-testid="viewMore"
      className={styles.viewMore}
      onClick={_moreItens}
    >
      <h3>Ver mais</h3>
    </div>
  );
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
      <Repositorio
        name={repo.name}
        link={repo.html_url}
        language={repo.language}
        description={repo.description}
        index={index}
        key={index}
      />
    );
  });

  if (repos.status !== "OK")
    return <EmptyContent repos dataTestId="semRepositorio" message="Repositórios não encontrados" />

  if (repos.data.length === 0)
    return <EmptyContent repos dataTestId="repositoriosVazio" message="Usuário sem repositórios públicos" />

  return (
    <div className={styles.lista_infinita}>
      {list}
      <ViewMore
        page={page} pages={pages} usuario={usuario}
        setRepos={setRepos} repos={repos} setPage={setPage}
      />
    </div>
  );
};

export default RepoList;
