import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormMessage from "components/FormMessage";
import isEmail from "validator/es/lib/isEmail";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import equals from "validator/es/lib/equals";

const initialData = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignUpForm = (props) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setFormObj = (data, fn) => ({ target }) => {
    return fn({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        await props.submit(data);
        setLoading(false);
      } catch (error) {
        setErrors(error.response.data.errors);
        setLoading(false);
      }
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.username || data.username.length < 2)
      errors.username = "Invalid username";
    if (!isEmail(data.email)) errors.email = "Wrong email";
    if (!isStrongPassword(data.password))
      errors.password = "Password cannot be blank";
    if (!isStrongPassword(data.passwordConfirmation))
      errors.passwordConfirmation = "Password confirmation cannot be blank";
    if (!equals(data.password, data.passwordConfirmation))
      errors.password = "Password is not equals to password confirm";
    return errors;
  };

  return (
    <form
      className={`"form-signin" ${loading ? "spinner-border" : ""}`}
      onSubmit={handleSubmit}
    >
      <h1 className="mt-2 text-center alert alert-dark">Signup</h1>
      <div className={`form-group ${errors.username ? "alert-danger" : ""}`}>
        <label htmlFor="userName" >Username</label>
        <input
          value={data.username}
          onChange={setFormObj(data, setData)}
          name="userName"
          type="text"
          id="userName"
          className="form-control"
          placeholder="Username"
          autoFocus
        />
        {errors.username && <FormMessage>{errors.username}</FormMessage>}
      </div>
      <div className={`form-group ${errors.email ? "alert-danger" : ""}`}>
        <label htmlFor="inputEmail" className="mt-2">Email address</label>
        <input
          value={data.email}
          onChange={setFormObj(data, setData)}
          name="email"
          type="text"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
        />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </div>
      <div className={`form-group ${errors.password ? "alert-danger" : ""}`}>
        <label htmlFor="inputPassword" className="mt-2">
          Password
        </label>
        <input
          value={data.password}
          type="text"
          onChange={setFormObj(data, setData)}
          name="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
        />
        {errors.password && <FormMessage>{errors.password}</FormMessage>}
      </div>
      <div
        className={`form-group ${
          errors.passwordConfirmation ? "alert-danger" : ""
        }`}
      >
        <label htmlFor="confirmPassword" className="mt-2">
          Confirm Password
        </label>
        <input
          value={data.passwordConfirmation}
          type="text"
          onChange={setFormObj(data, setData)}
          name="passwordConfirmation"
          id="confirmPassword"
          className="form-control"
          placeholder="Confirm Password"
        />
        {errors.passwordConfirmation && (
          <FormMessage>{errors.passwordConfirmation}</FormMessage>
        )}
      </div>
      <div>
        <button className="btn btn-dark mt-2 w-50" type="submit">
          Register
        </button>
        <Link to="/" className="btn btn-light mt-2 w-50">
          Cencel
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
