import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";
import { handleUserRegistration } from "../../../../utils/public.api.helper";
import { USER_TYPE } from "../../../../utils/constant";

const Register = () => {
  let [formValues, setFormValues] = useState({
    email: "",
    userRole: USER_TYPE.RECRUITER,
    password: "",
    confirmPassword: "",
    name: "",
    skills: "",
  });

  const handleRegisterFormValues = (event: any) => {
    const { value, name } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    formValues = {
      ...formValues,
      userRole: formValues.userRole,
    };
    const res = await handleUserRegistration(formValues);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <form>
          <h3>Register</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              onChange={handleRegisterFormValues}
              className="form-control"
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              onChange={handleRegisterFormValues}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              onChange={handleRegisterFormValues}
              className="form-control"
              placeholder="Enter comma separated skills"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              onChange={handleRegisterFormValues}
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleRegisterFormValues}
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="userRole"
              className="form-control"
              onChange={handleRegisterFormValues}
            >
              <option value={1}>Candidate</option>
              <option value={0}>Employer</option>
            </select>
          </div>
          <div className="text-center">
            <button
              onClick={(event) => handleRegister(event)}
              className="btn btn-primary btn-block"
            >
              Register
            </button>
          </div>
          <br />
          <p>
            Already have Account?
            <Link to="/login">
              <i className="fas fa-user-plus" /> Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
