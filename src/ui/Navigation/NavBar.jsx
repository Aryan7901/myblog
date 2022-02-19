import { React, Fragment } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import classes from "./NavBar.module.css";
function Navbar() {
  return (
    <Fragment>
      <MobileNavigation className={classes.mobile} />
      <Navigation className={classes.pc} />
    </Fragment>
  );
}

export default Navbar;
