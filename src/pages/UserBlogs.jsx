import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogItem from "../components/BlogItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AllBlogs.module.css";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const token = useSelector((state) => state.user.token);
  const author = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/user/list",
          {
            headers: {
              authorization: `BEARER ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Could not fetch User's Pages");
        }
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [token]);
  const boolShowNotFound = JSON.stringify(blogs) === "[]";
  const boolBlogs = !!blogs;
  return (
    <Fragment>
      {boolShowNotFound && (
        <div className={classes.message}>
          <h1>You are yet to Write a Blog!</h1>
        </div>
      )}
      {boolBlogs ? (
        <section className={classes.content}>
          {blogs.map((blog) => {
            return (
              <BlogItem
                key={blog._id}
                title={blog.title}
                author={author}
                description={blog.description}
                id={blog._id}
              />
            );
          })}
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};
export default UserBlogs;
