import React, { Fragment, useState, useMemo } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import classes from "./Comments.module.css";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

function Comments(props) {
  const { comments } = props;
  const token = useSelector((state) => state.user.token);
  const [pageNumber, setPageNumber] = useState(0);
  const commentsPerPage = 5;
  const pagesVisited = pageNumber * commentsPerPage;

  // Sort comments in descending order by date (newest first)
  const sortedComments = useMemo(() => {
    if (!comments || !comments.length) return [];
    return [...comments].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }, [comments]);

  const length = !!sortedComments?.length ? sortedComments.length : 1;
  const pageCount = Math.ceil(length / commentsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className={classes.comments}>
      <h2>Comments</h2>
      {!!token ? (
        <CommentForm blogId={props.blogId} toggler={props.toggler} />
      ) : (
        <h3>Login to comment</h3>
      )}
      {sortedComments && sortedComments.length > 0 && (
        <Fragment>
          {sortedComments
            .slice(pagesVisited, pagesVisited + commentsPerPage)
            .map((comment) => {
              return (
                <CommentItem
                  comment={comment}
                  key={comment._id}
                  toggler={props.toggler}
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
        </Fragment>
      )}
    </div>
  );
}

export default Comments;
