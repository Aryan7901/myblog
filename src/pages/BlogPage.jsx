import { useParams } from "react-router-dom";
import classes from "./BlogPage.module.css";
import { useState, useEffect, Fragment } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import DeleteButton from "../ui/DeleteButton";
import { Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import { BiPencil } from "react-icons/bi";
import { useQuery } from "react-query";
import fetchBlog from "../fetchers/fetchBlog";
const BlogPage = () => {
  const params = useParams();
  const { id } = params;
  const user = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    setToggle((toggle) => !toggle);
  };
  const { data, error, isLoading } = useQuery(["blog-data", id], () =>
    fetchBlog(id)
  );
  const blog = data ? data.blog : null;
  const buttons = (
    <div className={classes.buttons}>
      <Link to={`/edit/${id}`}>
        <BiPencil className={classes.icon} size="30px" />
      </Link>
      <DeleteButton id={id} />
    </div>
  );
  let boolModify = false;
  if (!!user.token && blog) {
    boolModify = blog.author._id === user.id;
  }
  if (error) {
    return (
      <div className={classes.message}>
        <h1 className={classes.error}>{error.message}</h1>
      </div>
    );
  }
  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <div className={classes.blog}>
            <h1>{blog.title}</h1>
            <h2>{blog.author.firstName + " " + blog.author.lastName} </h2>
            <h3>{blog.description}</h3>
            {boolModify && buttons}
            <p>{blog.article}</p>
          </div>

          {<Comments blogId={id} comments={blog.comments} toggler={toggler} />}
        </Fragment>
      )}
    </Fragment>
  );
};
export default BlogPage;
