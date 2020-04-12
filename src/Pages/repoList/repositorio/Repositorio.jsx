import React from "react";
import styles from "./Repositorio.module.scss";

const Repo = props => {
  const { name, language, description, link, index } = props;
  return (
    <a
      data-testid={`repo-${index}`}
      className={styles.repositorio}
      href={link}
      target="_blank"
    >
      <h3 data-testid="name">{name}</h3>
      <div className={styles.text}>
        <p data-testid="description">{description}</p>
      </div>
      <p>{language}</p>
    </a>
  );
};

export default Repo;
