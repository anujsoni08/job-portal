import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";
import { handleUserLogin } from "../../../../utils/public.api.helper";

const Login = (props: any) => {
  const [loginType, setLoginType] = useState("candidate");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLoginFormValues = (event: any) => {
    const { value, name } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const res: any = await handleUserLogin(formValues);
    if (res.data.code === 200) {
      const { email, name, userRole, skills, token, id } = res.data.data;
      await sessionStorage.setItem("email", email);
      await sessionStorage.setItem("name", name);
      await sessionStorage.setItem("userRole", userRole);
      await sessionStorage.setItem("skills", skills);
      await sessionStorage.setItem("token", token);
      await sessionStorage.setItem("id", id);
      props.history.push("/");
    } else {
    }
  };

  return (
    <div className="card w-50">
      <div className="card-body">
        <form>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              onChange={handleLoginFormValues}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleLoginFormValues}
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="text-center">
            <button
              onClick={(event) => handleLogin(event)}
              className="btn btn-primary btn-block"
            >
              Login
            </button>
          </div>
          <br />
          <p>
            New user?
            <Link to="/signup">
              <i className="fas fa-user-plus" /> Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
