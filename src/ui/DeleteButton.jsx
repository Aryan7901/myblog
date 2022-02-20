import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./DeleteButton.module.css";
function DeleteButton(props) {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const id = props.id;
  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `BEARER ${token}`,
          },
        }
      );
      navigate(-1);
      if (!response.ok) {
        throw new Error("Could not delete blog page");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className={`${classes.delete} btn`} onClick={deleteHandler}>
      Delete
    </button>
  );
}

export default DeleteButton;
