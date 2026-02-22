import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Card from "../ui/Card";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store";
import { useDispatch } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import ErrorModal from "../ui/Modals/ErrorModal";
import { MdEmail, MdLockOutline, MdPersonOutline } from "react-icons/md";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
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
      <div className={classes.authContainer}>
        <Card className={classes.card}>
          <div className={classes.authHeader}>
            <div className={classes.iconWrapper}>
              <MdPersonOutline size={48} />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue to BlogMania</p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
              loginHandler(values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className={classes.form}>
                <div className={classes.inputGroup}>
                  <div className={classes.inputWrapper}>
                    <MdEmail className={classes.inputIcon} />
                    <input
                      name="email"
                      type="email"
                      placeholder=" "
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-filled={values.email ? "true" : "false"}
                    />
                    <label className={classes.floatingLabel}>Email Address</label>
                  </div>
                  {touched.email && errors.email && (
                    <span className={classes.errorText}>{errors.email}</span>
                  )}
                </div>

                <div className={classes.inputGroup}>
                  <div className={classes.inputWrapper}>
                    <MdLockOutline className={classes.inputIcon} />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=" "
                      autoComplete="off"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-filled={values.password ? "true" : "false"}
                    />
                    <label className={classes.floatingLabel}>Password</label>
                    <button
                      type="button"
                      className={classes.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁" : "👁‍🗨"}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <span className={classes.errorText}>{errors.password}</span>
                  )}
                </div>

                <button className={classes.submitBtn} type="submit">
                  <span>Sign In</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Form>
            )}
          </Formik>
          <div className={classes.authFooter}>
            <p>Don't have an account? <Link to="../signup">Create one</Link></p>
          </div>
        </Card>
        <div className={classes.authIllustration}>
          <div className={classes.illustrationContent}>
            <h2>Share Your Story</h2>
            <p>Join thousands of bloggers sharing their thoughts with the world</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
