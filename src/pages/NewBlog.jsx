import React from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import BlogForm from "../components/BlogForm";
function NewBlog() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const createBlogHandler = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/new-blog",
        {
          method: "POST",
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
        throw new Error("Could not create new page");
      }
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BlogForm
      blogHandler={createBlogHandler}
      title=""
      description=""
      article=""
      buttonText="Create Blog"
      text="Create a Blog"
    />
  );
}

export default NewBlog;
