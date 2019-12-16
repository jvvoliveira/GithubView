import React, { useContext } from "react";
import "./Loading.css";
import Spinner from "react-spinkit";
import { loadingContext } from "../../App";

export default () => {
  const { loading, message } = useContext(loadingContext);

  return loading ? (
    <div className="overlay-content" data-testid="loading">
      <div className="wrapper">
        <Spinner name="pacman" fadeIn="none" color="yellow" />
        <span className="message">{message}</span>
      </div>
    </div>
  ) : null;
};
