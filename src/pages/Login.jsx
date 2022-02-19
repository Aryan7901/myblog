import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Card from "../ui/Card";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store";
import { useDispatch } from "react-redux";
import FormikField from "../components/FormikField";
import { Fragment } from "react/cjs/react.production.min";
import ErrorModal from "../ui/Modals/ErrorModal";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("This field is Required!"),
    password: Yup.string()
      .min(8, "Too Short!")
      .required("This field is Required!"),
  });
  const loginHandler = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid Credentials");
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
      navigate("../", { replace: true });
      dispatch(userActions.login(data));
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  return (
    <Fragment>
      {!!error && <ErrorModal error={error} onClear={() => setError(false)} />}
      <Card className={classes.card}>
        <div className={classes.divisions}>
          <h1>Sign In</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            loginHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormikField name="email" label="Email" type="email" />
              <FormikField name="password" label="Password" type="password" />
              <button className="btn" type="submit">
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className={classes.divisions}>
          <Link to="../signup">Sign Up if you don't have an account yet</Link>
        </div>
      </Card>
    </Fragment>
  );
};
export default Login;
