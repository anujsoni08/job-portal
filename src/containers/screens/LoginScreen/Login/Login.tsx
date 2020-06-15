import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./index.css";
import { handleUserLogin } from "../../../../utils/public.api.helper";
import * as actions from "../../../../store/action";

const Login = (props: any) => {
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
      props.setSnackbarState({
        mode: "success",
        message: "Successfully logged in",
        state: true,
      });
      await sessionStorage.setItem("email", email);
      await sessionStorage.setItem("name", name);
      await sessionStorage.setItem("userRole", userRole);
      await sessionStorage.setItem("skills", skills);
      await sessionStorage.setItem("token", token);
      await sessionStorage.setItem("id", id);
      props.history.push("/");
    } else {
      props.setSnackbarState({
        mode: "error",
        message: "Logged in failed",
        state: true,
      });
    }
  };

  return (
    <div>
      <h4 className="text-center mt-3">Job Portal</h4>
      <div className="card w-50 mt-3">
        <div className="card-body">
          <form>
            <h3 className="text-center">Sign In</h3>

            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-form-label">
                Email address
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleLoginFormValues}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-form-label">
                Password
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleLoginFormValues}
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={(event) => handleLogin(event)}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
            <br />
            <p className="text-center">
              New user?
              <Link to="/signup">{"  "} Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    snackbarValues: state.snackbarValues,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSnackbarState: (snackbarObj: any) =>
      dispatch(actions.setSnackbarState(snackbarObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
