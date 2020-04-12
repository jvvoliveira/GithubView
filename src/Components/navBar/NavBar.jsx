import React from "react";
import styles from "./NavBar.module.scss";
import SearchBar from "../searchBar/SearchBar";
import { Link } from "react-router-dom";

const Navbar =  () => {
  return (
    <div className={styles.navList}>
      <div className={styles.wrapper}>
        <Link className={styles.item} to="/">
          Perfil
        </Link>
        <Link className={styles.item} to="/repositorios">
          Repositórios
        </Link>
      </div>
      <div className={styles.wrapper2}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;