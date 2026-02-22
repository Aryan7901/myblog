import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogItem from "../components/BlogItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AllBlogs.module.css";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";

const UserBlogs = () => {
  const token = useSelector((state) => state.user.token);
  const author = useSelector((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);
  const blogsPerPage = 10;
  const pagesVisited = pageNumber * blogsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const fetchBlogs = async () => {
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
    return response.json();
  };
  const { data, error, isLoading } = useQuery(
    ["user-blogs", token],
    fetchBlogs
  );
  const blogs = data ? data.blogs : null;
  const pageCount = !!blogs ? Math.ceil(blogs.length / blogsPerPage) : 0;
  const boolShowNotFound = JSON.stringify(blogs) === "[]";
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
      ) : boolShowNotFound ? (
        <div className={classes.message}>
          <h1>You are yet to Write a Blog!</h1>
        </div>
      ) : (
        <section className={classes.content}>
          {blogs
            .slice(pagesVisited, pagesVisited + blogsPerPage)
            .map((blog) => {
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
          <ReactPaginate
            previousLabel={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            }
            nextLabel={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            }
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={classes.container}
            previousClassName={classes.previous}
            nextClassName={classes.next}
            previousLinkClassName={classes.btn}
            nextLinkClassName={classes.btn}
            activeClassName={classes.active}
          />
        </section>
      )}
    </Fragment>
  );
};
export default UserBlogs;
