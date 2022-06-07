import { Fragment, useState } from "react";
import BlogItem from "../components/BlogItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AllBlogs.module.css";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
const AllBlogs = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const blogsPerPage = 10;
  const pagesVisited = pageNumber * blogsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const fetcher = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/blogs/all`
    );
    if (!response.ok) {
      throw new Error("Could not login");
    }
    return response.json();
  };
  const { data, error, isLoading } = useQuery("all-blogs", fetcher);
  let blogs = data ? data.blogs : [];
  const pageCount = !!blogs ? Math.ceil(blogs.length / blogsPerPage) : 0;
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
      )}
    </Fragment>
  );
};
export default AllBlogs;
