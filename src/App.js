import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import CategoriesList from "./components/AdminLayout/Categories/CategoriesList/CategoriesList";
import Dashboard from "./components/AdminLayout/Dashboard/Dashboard";
import UserList from "./components/AdminLayout/UserList/UserList";
import CreatePosts from "./components/CreatePosts/CreatePosts";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
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
import RedirectLoggedInUserRoute from "./components/security/RedirectLoggedInUserRoute";
import UserService from "./utils/UserService";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    AuthenticationService.isUserLoggedIn()
  );

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(UserService.isAdmin());

  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    return mode === "true" || false;
  });

  const [user, setUser] = useState(UserService.getUser());

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ErrorHandler
        setIsUserLoggedIn={setIsUserLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />
      <Switch>
        <Route
          exact
          path={["/", "/login", "/register", "/createposts", "/posts"]}
        >
          <ForumLayout>
            <Navigationbar
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              isAdminLoggedIn={isAdminLoggedIn}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
              darkMode={darkMode}
              handleDarkModeChange={handleDarkModeChange}
              user={user}
              setUser={setUser}
            />
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Home isAdminLoggedIn={isAdminLoggedIn} />}
              />
              <RedirectLoggedInUserRoute
                path="/login"
                exact
                isUserLoggedIn={isUserLoggedIn}
                component={() => (
                  <Login
                    user={user}
                    setUser={setUser}
                    setIsUserLoggedIn={setIsUserLoggedIn}
                    setIsAdminLoggedIn={setIsAdminLoggedIn}
                  />
                )}
              />
              <RedirectLoggedInUserRoute
                path="/register"
                exact
                component={Register}
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
                render={() => <Posts user={user} />}
                isUserLoggedIn={isUserLoggedIn}
              />
            </Switch>
          </ForumLayout>
        </Route>

        <Route
          exact
          path={["/dashboard", "/dashboard/categories", "/dashboard/users"]}
        >
          <AdminLayout
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            darkMode={darkMode}
            handleDarkModeChange={handleDarkModeChange}
            user={user}
            setUser={setUser}
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
                path="/dashboard/categories"
                exact
                component={CategoriesList}
                isAdminLoggedIn={isAdminLoggedIn}
              />
            </Switch>
          </AdminLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
