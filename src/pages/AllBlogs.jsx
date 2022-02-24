import { Fragment, useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AllBlogs.module.css";
import ReactPaginate from "react-paginate";
const AllBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const blogsPerPage = 10;
  const pagesVisited = pageNumber * blogsPerPage;
  const pageCount = !!blogs ? Math.ceil(blogs.length / blogsPerPage) : 0;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
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
          {blogs
            .slice(pagesVisited, pagesVisited + blogsPerPage)
            .map((blog) => {
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
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={classes.container}
            previousLinkClassName={classes.btn}
            nextLinkClassName={classes.btn}
            activeClassName={classes.active}
          />
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};
export default AllBlogs;
