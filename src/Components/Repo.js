import React from "react";
import styles from "./Repo.module.scss";

const Repo = props => {
  return (
    <a className={styles.repositorio} href={props.link} target="_blank">
      <h3>{props.name}</h3>
      <div className={styles.text}>
        <p>{props.description}</p>
      </div>
      <p>{props.language}</p>
    </a>
  );
};

export default Repo;
