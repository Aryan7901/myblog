import React from "react";
import classes from "./LoadingSpinner.module.css";
function LoadingSpinner(props) {
  return (
    <div className={classes["lds-ring"] + " " + props.className}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;
