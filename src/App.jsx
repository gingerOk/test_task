import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import UsersPage from "pages/UsersPage";
import SignUpPage from "pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <TopNavigation />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
