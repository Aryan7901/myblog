import React, { Fragment, useState } from "react";
import classes from "./CommentItem.module.css";
import userImage from "../../images/user-img.png";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import UpdateForm from "./UpdateForm";
function CommentItem(props) {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const boolModify = id === props.comment.user._id;
  const [edit, setEdit] = useState(false);
  function capitalize(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1).toLowerCase();
  }
  const editToggle = () => {
    setEdit((edit) => !edit);
  };
  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/comment/${props.comment._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `BEARER ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not delete comment");
      }
      props.toggler();
    } catch (err) {
      console.log(err);
    }
  };
  const date = new Date(props.comment.date).toLocaleString();
  return (
    <div className={classes.item}>
      <div className={classes.user}>
        <img src={userImage} alt="Icon" />
        <h3>
          {capitalize(props.comment.user.firstName) +
            " " +
            capitalize(props.comment.user.lastName) +
            " "}
          <span className={classes.span}>{date}</span>
          <span>
            {boolModify && (
              <Fragment>
                <BiPencil
                  size="20px"
                  color="grey"
                  className={classes.icon}
                  onClick={editToggle}
                />
                <AiOutlineDelete
                  size="20px"
                  color="grey"
                  className={classes.icon}
                  onClick={deleteHandler}
                />
              </Fragment>
            )}
          </span>
        </h3>
      </div>
      {!edit ? (
        <p>{props.comment.content}</p>
      ) : (
        <UpdateForm
          commentId={props.comment._id}
          comment={props.comment.content}
          toggler={props.toggler}
          editToggle={editToggle}
        />
      )}
    </div>
  );
}

export default CommentItem;
