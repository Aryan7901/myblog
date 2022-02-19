import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import classes from "./FormikField.module.css";
function FormikField(props) {
  let type;
  if (!props.type) {
    type = "text";
  } else {
    type = props.type;
  }
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <Field name={props.name} type={type} />
      <ErrorMessage name={props.name} className={classes.error}>
        {(msg) => <div className={classes.error}>{msg}</div>}
      </ErrorMessage>
    </Fragment>
  );
}

export default FormikField;
