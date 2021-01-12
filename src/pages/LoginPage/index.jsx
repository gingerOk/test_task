import React from "react";
import { useHistory } from "react-router-dom";
import { useUser, login } from "contexts/UserContext";
import LoginForm from "pages/LoginPage/components/LoginForm";
import { users } from "api";

const LoginPage = () => {
  const [, dispatch] = useUser();
  const history = useHistory();

  const submit = (user) => {
    users.login(user).then((token) => {
      console.log(user)
      login(dispatch, token);
      history.push("/users");
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <LoginForm submit={submit} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
