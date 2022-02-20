import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import classes from "./BlogForm.module.css";
import Card from "../ui/Card";
import FormikField from "./FormikField";
function BlogForm(props) {
  const blogSchema = Yup.object().shape({
    title: Yup.string().required("This field is Required!"),
    description: Yup.string().required("This field is Required!"),
    article: Yup.string()
      .required("This field is Required!")
      .min(500, "Article too short"),
  });
  return (
    <Card className={classes.card}>
      <div className={classes.divisions}>
        <h1>{props.text}</h1>
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
        }}
      >
        {({ errors, touched, handleBlur, handleChange, values }) => (
          <Form>
            <FormikField name="title" label="Title" />
            <FormikField name="description" label="Description" />
            <label htmlFor="article">Article</label>
            <textarea
              name="article"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.article}
            />
            {errors.article && touched.article && (
              <div className={classes.error}>{errors.article}</div>
            )}
            <button className="btn" type="submit">
              {props.buttonText}
            </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default BlogForm;
