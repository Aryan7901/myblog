import { Fragment, useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AllBlogs.module.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/all`
        );
        if (!response.ok) {
          throw new Error("Could not login");
        }
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);
  const boolBlogs = !!blogs;
  return (
    <Fragment>
      {boolBlogs ? (
        <section className={classes.content}>
          {blogs.map((blog) => {
            return (
              <BlogItem
                key={blog._id}
                title={blog.title}
                author={blog.author}
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
export default AllBlogs;
