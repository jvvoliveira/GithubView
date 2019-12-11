import React, { useContext } from "react";
import styles from "./Perfil.module.scss";
import { loadingContext } from "../../App";

const Perfil = () => {
  const { data, status } = useContext(loadingContext).usuario;

  if (data !== undefined) {
    if (status === "OK") {
      return (
        <div className={styles.container}>
          <h1 data-testid="nome">{data.name ? data.name : data.login}</h1>
          <div className={styles.wrapper}>
            <div data-testid="imagemPerfil" className={styles.wrapper_img}>
              <a href={data.html_url} target="_blank">
                <img data-testid="foto" src={data.avatar_url} />
              </a>
            </div>
            <div
              className={styles.wrapper_info}
            >
              <p data-testid="bio">{data.bio}</p>
              <p data-testid="local">{data.location}</p>
              <p data-testid="seguidores">Seguidores: {data.followers}</p>
              <p data-testid="reposPublicos">
                Repositórios públicos: {data.public_repos}
              </p>
              <p data-testid="dataCriacao">Criado em: {data.created_at}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <h2 data-testid="messageNotFound">Usuário não encontrado</h2>;
    }
  } else {
    return (
      <h2 data-testid="messageInitial">Pesquise por algum usuário GitHub</h2>
    );
  }
};

export default Perfil;
