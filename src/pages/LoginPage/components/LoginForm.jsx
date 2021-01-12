import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import FormMessage from "components/FormMessage";

const initialData = {
  email: "",
  password: "",
};

const LoginForm = (props) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Email cannot be blank";
    if (!isStrongPassword(data.password))
      errors.password = "Password cannot be blank";

    return errors;
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
        setLoading(false);
      }
    }
  };
  const setFormObj = (data, fn) => ({ target }) => {
    return fn({ ...data, [target.name]: target.value });
  };
  return (
    <form
      className={`form-signin ${loading ? "spinner-border" : ""}`}
      onSubmit={handleSubmit}
    >
      <h1 className="mt-2 text-center alert alert-dark">Please Login</h1>
      <div className={`form-group ${errors.email ? "alert-danger" : ""}`}>
        <label htmlFor="inputEmail" className="mt-2">
          Email address
        </label>
        <input
          value={data.email}
          onChange={setFormObj(data, setData)}
          type="text"
          name="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          autoFocus
        />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </div>
      <div className={`form-group ${errors.password ? "alert-danger" : ""}`}>
        <label htmlFor="inputPassword" className="mt-2">
          Password
        </label>
        <input
          value={data.password}
          onChange={setFormObj(data, setData)}
          type="text"
          name="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
        />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </div>
      <button type="submit" className="btn btn-dark mt-4 w-50">
        Login
      </button>
      <Link to="/" className="btn btn-light mt-4 w-50">
        Cansel
      </Link>
    </form>
  );
};

export default LoginForm;
