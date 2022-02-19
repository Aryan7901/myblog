import React, { useState } from "react";
import Card from "../ui/Card";
import * as Yup from "yup";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { userActions } from "../store";
import { useDispatch } from "react-redux";
import FormikField from "../components/FormikField";
import { Fragment } from "react/cjs/react.production.min";
import ErrorModal from "../ui/Modals/ErrorModal";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is Required!"),
    lastName: Yup.string().required("This field is Required!"),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is Required!"),
    password: Yup.string()
      .min(8, "Too Short!")
      .required("This field is Required!"),
  });
  const signupHandler = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/signup",
        {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not Sign Up!");
      }
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data));
      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 60
      );
      localStorage.setItem(
        "timer",
        JSON.stringify({ timer: tokenExpirationDate.toISOString() })
      );
      dispatch(userActions.login(data));
      navigate("../", { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <Fragment>
      {!!error && <ErrorModal error={error} onClear={() => setError(false)} />}
      <Card className={classes.card}>
        <div className={classes.divisions}>
          <h1>Sign Up</h1>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            signupHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormikField name="firstName" label="First Name" />
              <FormikField name="lastName" label="Last Name" />
              <FormikField name="email" label="Email" type="email" />
              <FormikField name="password" label="Password" type="password" />
              <button className="btn" type="submit">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className={classes.divisions}>
          <Link to="../login">Sign In if you have an existing account</Link>
        </div>
      </Card>
    </Fragment>
  );
}

export default SignUp;
