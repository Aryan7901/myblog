import React, { Fragment, useState } from "react";
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
  const length = !!comments.length ? comments.length : 1;
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
      {comments && (
        <Fragment>
          {comments
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
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={classes.container}
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
