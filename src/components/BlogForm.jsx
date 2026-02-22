import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import classes from "./BlogForm.module.css";
import Card from "../ui/Card";
import { MdTitle, MdDescription, MdArticle, MdCheck } from "react-icons/md";

function BlogForm(props) {
  const [disabled, setDisabled] = useState(false);
  const blogSchema = Yup.object().shape({
    title: Yup.string().required("This field is Required!"),
    description: Yup.string().required("This field is Required!"),
    article: Yup.string()
      .required("This field is Required!")
      .min(500, "Article must be at least 500 characters"),
  });
  
  return (
    <div className={classes.blogFormContainer}>
      <Card className={classes.card}>
        <div className={classes.formHeader}>
          <div className={classes.headerIcon}>
            <MdArticle size={40} />
          </div>
          <h1>{props.text}</h1>
          <p>Share your thoughts with the world</p>
        </div>
        <Formik
          initialValues={{
            title: props.title,
            description: props.description,
            article: props.article,
          }}
          validationSchema={blogSchema}
          onSubmit={(values) => {
            props.blogHandler(values);
            setDisabled(true);
            setTimeout(() => {
              setDisabled(false);
            }, 3000);
          }}
        >
          {({ errors, touched, handleBlur, handleChange, values }) => (
            <Form className={classes.form}>
              <div className={classes.formGroup}>
                <div className={classes.inputWrapper}>
                  <MdTitle className={classes.inputIcon} />
                  <input
                    name="title"
                    type="text"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    data-filled={values.title ? "true" : "false"}
                  />
                  <label className={classes.floatingLabel}>Blog Title</label>
                </div>
                {touched.title && errors.title && (
                  <span className={classes.errorText}>{errors.title}</span>
                )}
              </div>

              <div className={classes.formGroup}>
                <div className={classes.inputWrapper}>
                  <MdDescription className={classes.inputIcon} />
                  <input
                    name="description"
                    type="text"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    data-filled={values.description ? "true" : "false"}
                  />
                  <label className={classes.floatingLabel}>Short Description</label>
                </div>
                {touched.description && errors.description && (
                  <span className={classes.errorText}>{errors.description}</span>
                )}
              </div>

              <div className={classes.formGroup}>
                <div className={classes.textareaWrapper}>
                  <MdArticle className={classes.inputIcon} />
                  <textarea
                    name="article"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.article}
                    data-filled={values.article ? "true" : "false"}
                  />
                  <label className={classes.floatingLabel}>Write Your Article (min 500 characters)</label>
                  <div className={classes.charCount}>
                    {values.article?.length || 0} characters
                  </div>
                </div>
                {touched.article && errors.article && (
                  <span className={classes.errorText}>{errors.article}</span>
                )}
              </div>

              <button className={classes.submitBtn} type="submit" disabled={disabled}>
                {disabled ? (
                  <>
                    <MdCheck className={classes.checkIcon} />
                    <span>Submitted!</span>
                  </>
                ) : (
                  <>
                    <span>{props.buttonText}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default BlogForm;
