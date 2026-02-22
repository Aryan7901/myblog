import React, { useState } from "react";
import Card from "../ui/Card";
import * as Yup from "yup";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { userActions } from "../store";
import { useDispatch } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import ErrorModal from "../ui/Modals/ErrorModal";
import { MdEmail, MdLockOutline, MdPersonOutline, MdBadge } from "react-icons/md";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
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
      <div className={classes.authContainer}>
        <Card className={classes.card}>
          <div className={classes.authHeader}>
            <div className={classes.iconWrapper}>
              <MdPersonOutline size={48} />
            </div>
            <h1>Create Account</h1>
            <p>Join BlogMania and start your blogging journey</p>
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
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className={classes.form}>
                <div className={classes.inputRow}>
                  <div className={classes.inputGroup}>
                    <div className={classes.inputWrapper}>
                      <MdBadge className={classes.inputIcon} />
                      <input
                        name="firstName"
                        type="text"
                        placeholder=" "
                        autoComplete="off"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        data-filled={values.firstName ? "true" : "false"}
                      />
                      <label className={classes.floatingLabel}>First Name</label>
                    </div>
                    {touched.firstName && errors.firstName && (
                      <span className={classes.errorText}>{errors.firstName}</span>
                    )}
                  </div>

                  <div className={classes.inputGroup}>
                    <div className={classes.inputWrapper}>
                      <MdBadge className={classes.inputIcon} />
                      <input
                        name="lastName"
                        type="text"
                        placeholder=" "
                        autoComplete="off"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        data-filled={values.lastName ? "true" : "false"}
                      />
                      <label className={classes.floatingLabel}>Last Name</label>
                    </div>
                    {touched.lastName && errors.lastName && (
                      <span className={classes.errorText}>{errors.lastName}</span>
                    )}
                  </div>
                </div>

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
                  <span>Create Account</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Form>
            )}
          </Formik>
          <div className={classes.authFooter}>
            <p>Already have an account? <Link to="../login">Sign in</Link></p>
          </div>
        </Card>
        <div className={classes.authIllustration}>
          <div className={classes.illustrationContent}>
            <h2>Start Your Journey</h2>
            <p>Express yourself and connect with readers worldwide</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
