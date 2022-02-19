import React, { useState } from "react";
import Links from "./Links";
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import classes from "./MobileNavigation.module.css";
function MobileNavigation(props) {
  const [open, setOpen] = useState(false);
  const resetHandler = () => {
    setOpen(false);
  };
  const closeIcon = (
    <CgClose
      className={classes.hamburger}
      size="40px"
      color="white"
      onClick={() => setOpen(!open)}
    />
  );
  const hamburgerIcon = (
    <CgMenuRightAlt
      className={classes.hamburger}
      size="40px"
      color="white"
      onClick={() => setOpen(!open)}
    />
  );
  return (
    <nav className={classes.nav + " " + props.className}>
      <h1>BlogMania</h1>

      {open ? closeIcon : hamburgerIcon}
      {open && <Links reset={resetHandler} />}
    </nav>
  );
}

export default MobileNavigation;
