import React from "react";
import {useHistory} from "react-router-dom";
import SignUpForm from "pages/SignUpPage/components/SignUpForm";
import {users} from "api";

const RegisterPage = () => {
  const history = useHistory();

  const submit = ({username, email, password}) => {
    users.create({username, email, password}).then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <SignUpForm submit={submit} />
        </div>
      </div>
    </div>
  );
};


export default RegisterPage;
