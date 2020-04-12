import React from "react";
import styles from "./EmptyContent.module.scss";

import iconUserNotFound from "../../assets/UserNotFound.png";
import iconReposNotFound from "../../assets/ReposNotFound.png";

const EmptyContent = (props) => {
    const { dataTestId, message, user, repos } = props;
    let icon;
    if(user) icon =  iconUserNotFound;
    if(repos) icon = iconReposNotFound;

    return (
      <div className={styles.empty}>
        <img src={icon} alt="not found" />
        <h2 data-testid={dataTestId}>{message}</h2>
      </div>
    )
  };

  export default EmptyContent;