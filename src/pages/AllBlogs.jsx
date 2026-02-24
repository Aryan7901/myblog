import { Fragment, useState, useMemo } from "react";
import BlogItem from "../components/BlogItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AllBlogs.module.css";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
const AllBlogs = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const blogsPerPage = 9;
  const pagesVisited = pageNumber * blogsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const fetcher = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/blogs/all`
    );
    if (!response.ok) {
      throw new Error("Could not fetch blogs");
    }
    return response.json();
  };
  const { data, error, isLoading } = useQuery("all-blogs", fetcher);
  let allBlogs = data ? data.blogs : [];
  
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return allBlogs;
    const query = searchQuery.toLowerCase();
    return allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      `${blog.author.firstName} ${blog.author.lastName}`.toLowerCase().includes(query)
    );
  }, [allBlogs, searchQuery]);
  
  const displayBlogs = filteredBlogs.slice(pagesVisited, pagesVisited + blogsPerPage);
  const pageCount = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(0);
  };
  
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
          <header className={classes.header}>
            <div className={classes.headerTop}>
              <h1 className={classes.title}>Blog Posts</h1>
              <span className={classes.count}>{filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'}</span>
            </div>
            <div className={classes.searchWrapper}>
              <svg className={classes.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search blogs by title, description, or author..."
                value={searchQuery}
                onChange={handleSearch}
                className={classes.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className={classes.clearBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </header>
          
          <div className={classes.listWrapper}>
            {displayBlogs.length === 0 ? (
              <div className={classes.emptyState}>
                {searchQuery ? (
                  <>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                      <path d="M8 8l6 6M14 8l-6 6"/>
                    </svg>
                    <h2>No blogs found</h2>
                    <p>Try adjusting your search terms</p>
                  </>
                ) : (
                  <>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                    <h2>No blogs yet</h2>
                    <p>Be the first to create a blog post!</p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className={classes.grid}>
                  {displayBlogs.map((blog) => {
                    return (
                      <BlogItem
                        key={blog._id}
                        title={blog.title}
                        author={blog.author}
                        description={blog.description}
                        id={blog._id}
                        createdAt={blog.createdAt}
                      />
                    );
                  })}
                </div>
                {pageCount > 1 && (
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
                )}
              </>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};
export default AllBlogs;
