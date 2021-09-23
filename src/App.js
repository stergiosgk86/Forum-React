import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Dashboard from "./components/AdminLayout/Dashboard";
import NewUser from "./components/AdminLayout/NewUser/NewUser";
import User from "./components/AdminLayout/User/User";
import UserList from "./components/AdminLayout/UserList/UserList";
import Comments from "./components/Comments/Comments";
import CreateCategories from "./components/CreateCategories/CreateCategories";
import CreatePosts from "./components/CreatePosts/CreatePosts";
import ForumLayout from "./components/ForumLayout/ForumLayout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navigationbar from "./components/Navigationbar/Navigationbar";
import NotFound from "./components/NotFound/NotFound";
import Posts from "./components/Posts/Posts";
import Register from "./components/Register/Register";
import AdminRoute from "./components/security/AdminRoute";
import AuthenticatedRoute from "./components/security/AuthenticatedRoute";
import AuthenticationService from "./components/security/AuthenticationService";
import UserService from "./utils/UserService";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    AuthenticationService.isUserLoggedIn()
  );
  const updateIsUserLoggedIn = (isLoggedIn) => {
    setIsUserLoggedIn(isLoggedIn);
  };
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(UserService.isAdmin());
  const updateIsAdminLoggedIn = (adminLoggedIn) => {
    setIsAdminLoggedIn(adminLoggedIn);
  };

  return (
    <Switch>
      <Route
        exact
        path={[
          "/",
          "/login",
          "/register",
          "/createcategories",
          "/createposts",
          "/posts",
          "/comments",
        ]}
      >
        <ForumLayout>
          <Navigationbar
            isUserLoggedIn={isUserLoggedIn}
            updateIsUserLoggedIn={updateIsUserLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
            updateIsAdminLoggedIn={updateIsAdminLoggedIn}
          />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              exact
              component={() => (
                <Login
                  updateIsUserLoggedIn={updateIsUserLoggedIn}
                  updateIsAdminLoggedIn={updateIsAdminLoggedIn}
                />
              )}
            />
            <Route path="/register" exact component={Register} />
            <AuthenticatedRoute
              path="/createcategories"
              exact
              component={CreateCategories}
              isUserLoggedIn={isUserLoggedIn}
            />
            <AuthenticatedRoute
              path="/createposts"
              exact
              component={CreatePosts}
              isUserLoggedIn={isUserLoggedIn}
            />
            <AuthenticatedRoute
              path="/posts"
              exact
              component={Posts}
              isUserLoggedIn={isUserLoggedIn}
            />
            <AuthenticatedRoute
              path="/comments"
              exact
              component={Comments}
              isUserLoggedIn={isUserLoggedIn}
            />
          </Switch>
        </ForumLayout>
      </Route>

      <Route
        exact
        path={[
          "/dashboard",
          "/dashboard/users",
          "/dashboard/user/:id",
          "/dashboard/newUser",
        ]}
      >
        <AdminLayout
          isUserLoggedIn={isUserLoggedIn}
          updateIsUserLoggedIn={updateIsUserLoggedIn}
          isAdminLoggedIn={isAdminLoggedIn}
          updateIsAdminLoggedIn={updateIsAdminLoggedIn}
        >
          <Switch>
            <AdminRoute
              path="/dashboard"
              exact
              component={Dashboard}
              isAdminLoggedIn={isAdminLoggedIn}
            />
            <AdminRoute
              path="/dashboard/users"
              exact
              component={UserList}
              isAdminLoggedIn={isAdminLoggedIn}
            />
            <AdminRoute
              path="/dashboard/user/:id"
              exact
              component={User}
              isAdminLoggedIn={isAdminLoggedIn}
            />
            <AdminRoute
              path="/dashboard/newUser"
              exact
              component={NewUser}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          </Switch>
        </AdminLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
