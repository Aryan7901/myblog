import { useParams } from "react-router-dom";
import classes from "./BlogPage.module.css";
import { useState, useEffect, Fragment } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import DeleteButton from "../ui/DeleteButton";
import { Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import { BiPencil } from "react-icons/bi";
const BlogPage = () => {
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const user = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    setToggle((toggle) => !toggle);
  };
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/blog/${id}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch blog page");
        }
        const data = await response.json();
        setBlog(data.blog);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [id, toggle]);
  const buttons = (
    <div className={classes.buttons}>
      <Link to={`/edit/${id}`}>
        <BiPencil className={classes.icon} size="30px" color="black" />
      </Link>
      <DeleteButton id={id} />
    </div>
  );
  const boolBlog = !!blog;
  let boolModify = false;
  if (!!user.token && blog) {
    boolModify = blog.author._id === user.id;
  }
  return (
    <Fragment>
      {boolBlog ? (
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
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};
export default BlogPage;
