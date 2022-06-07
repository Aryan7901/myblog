import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../ui/LoadingSpinner";
import BlogForm from "../components/BlogForm";
import { Fragment } from "react/cjs/react.production.min";
import { useQuery } from "react-query";
import classes from "./EditBlog.module.css";
import fetchBlog from "../fetchers/fetchBlog";
function EditBlog() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery(["blog-data", id], () =>
    fetchBlog(id)
  );
  const blog = data ? data.blog : null;
  const updateBlogHandler = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            article: values.article,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `BEARER ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not edit page");
      }
      navigate("/user", { replace: true });
    } catch (err) {
      console.log(err);
    }
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
        <BlogForm
          blogHandler={updateBlogHandler}
          title={blog.title}
          description={blog.description}
          article={blog.article}
          buttonText="Edit Blog"
          text="Edit Blog"
        />
      )}
    </Fragment>
  );
}

export default EditBlog;
