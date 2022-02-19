import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import classes from "./BlogPage.module.css";
import { useState, useEffect, Fragment } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import DeleteButton from "../ui/DeleteButton";
import { Link } from "react-router-dom";
const BlogPage = () => {
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const user = useSelector((state) => state.user);
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
  }, [id]);

  const boolBlog = !!blog;
  let boolModify = false;
  if (!!user.token && blog) {
    boolModify = blog.author._id === user.id;
  }
  return (
    <Fragment>
      {boolBlog ? (
        <Card className={classes.card}>
          <h1>{blog.title} </h1>
          <h2>{blog.author.firstName + " " + blog.author.lastName} </h2>
          <h3>{blog.description}</h3>
          <p>{blog.article}</p>
        </Card>
      ) : (
        <LoadingSpinner />
      )}
      {boolModify && (
        <div className={classes.buttons}>
          <Link to={`/edit/${id}`}>
            <button className={`${classes.edit} btn`}>Edit</button>
          </Link>
          <DeleteButton id={id} />
        </div>
      )}
    </Fragment>
  );
};
export default BlogPage;
