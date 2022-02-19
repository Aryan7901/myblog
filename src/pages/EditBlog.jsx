import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../ui/LoadingSpinner";
import BlogForm from "../components/BlogForm";
import { Fragment } from "react/cjs/react.production.min";
function EditBlog() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/blog/${id}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch blog data");
        }
        const data = await response.json();
        setBlog(data.blog);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [id]);

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
  return (
    <Fragment>
      {!!blog ? (
        <BlogForm
          blogHandler={updateBlogHandler}
          title={blog.title}
          description={blog.description}
          article={blog.article}
          buttonText="Edit Blog"
          text="Edit Blog"
        />
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
}

export default EditBlog;
