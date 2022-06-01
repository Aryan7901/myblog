import { Navigate, Route, Routes } from "react-router-dom";
import AllBlogs from "./pages/AllBlogs";
import React, {
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./ui/Navigation/NavBar";
import { userActions } from "./store";
import LoadingSpinner from "./ui/LoadingSpinner";
//import BlogPage from "./pages/BlogPage";
//import Login from "./pages/Login";
//import SignUp from "./pages/SignUp";
//import UserBlogs from "./pages/UserBlogs";
// import NewBlog from "./pages/NewBlog";
// import EditBlog from "./pages/EditBlog";
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const UserBlogs = React.lazy(() => import("./pages/UserBlogs"));
const NewBlog = React.lazy(() => import("./pages/NewBlog"));
const EditBlog = React.lazy(() => import("./pages/EditBlog"));
function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const time = useRef();
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("timer");
    dispatch(userActions.logout());
  }, [dispatch]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const timer = JSON.parse(localStorage.getItem("timer"));
    if (!!!storedData) {
      return;
    } else if (new Date(timer.timer) > new Date()) {
      dispatch(userActions.login(storedData));
      const remainingTime =
        new Date(timer.timer).getTime() - new Date().getTime();
      time.current = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(time.current);
    }
  }, [dispatch, token, logoutHandler]);
  let routes;
  if (!!!token) {
    routes = (
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/:id" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/:id" element={<BlogPage />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/user" element={<UserBlogs />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}> {routes}</Suspense>
    </Fragment>
  );
}

export default App;
