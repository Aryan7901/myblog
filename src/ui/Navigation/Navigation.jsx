import classes from "./Navigation.module.css";

import Links from "./Links";
const Navigation = (props) => {
  return (
    <nav className={classes.navbar + " " + props.className}>
      <h1>BlogMania</h1>
      <Links />
    </nav>
  );
};
export default Navigation;
