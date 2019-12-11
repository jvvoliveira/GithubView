import React from "react";
import styles from "./Repo.module.scss";

const Repo = props => {
  const { name, language, description, link, index } = props;
  return (
    <a
      data-testid={`repo-${index}`}
      className={styles.repositorio}
      href={link}
      target="_blank"
      key={index}
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
