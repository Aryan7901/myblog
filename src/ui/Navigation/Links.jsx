import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
function Links(props) {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("timer");
    dispatch(userActions.logout())();
  };
  return (
    <ul>
      <li onClick={props.reset}>
        <NavLink to="/">Home</NavLink>
      </li>
      {!!!token ? (
        <Fragment>
          <li onClick={props.reset}>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li onClick={props.reset}>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </Fragment>
      ) : (
        <Fragment>
          <li onClick={props.reset}>
            <NavLink to="new-blog">Create Blog</NavLink>
          </li>
          <li onClick={props.reset}>
            <NavLink to="/user">My Blogs</NavLink>
          </li>
          <li onClick={props.reset}>
            <NavLink to="/" onClick={logoutHandler}>
              Log Out
            </NavLink>
          </li>
        </Fragment>
      )}
    </ul>
  );
}

export default Links;
