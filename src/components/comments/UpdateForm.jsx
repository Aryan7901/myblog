import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import classes from "./CommentForm.module.css";
import { useSelector } from "react-redux";
function UpdateForm(props) {
  const [disabled, setDisabled] = useState(false);
  const token = useSelector((state) => state.user.token);

  const updateCommentHandler = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/blogs/comment/${props.commentId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            comment: values.comment,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `BEARER ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not update comment");
      }
      props.editToggle();
      props.toggler();
    } catch (err) {
      console.log(err);
    }
  };
  const commentSchema = Yup.object().shape({
    comment: Yup.string().required("Your comment is empty!"),
  });
  return (
    <section className={classes.form}>
      <Formik
        initialValues={{
          comment: props.comment,
        }}
        validationSchema={commentSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          updateCommentHandler(values);
          setDisabled(true);
          setTimeout(() => {
            setDisabled(false);
          }, 3000);
        }}
      >
        {({ errors, handleBlur, handleChange, values }) => (
          <Form>
            <label htmlFor="comment"> Edit Comment</label>
            <textarea
              name="comment"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
            />
            {errors.comment && (
              <div className={classes.error}>{errors.comment}</div>
            )}
            <button className="btn" type="submit" disabled={disabled}>
              Comment
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default UpdateForm;
