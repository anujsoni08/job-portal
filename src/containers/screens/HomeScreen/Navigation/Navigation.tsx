import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import "./index.css";
import { USER_TYPE } from "../../../../utils/constant";
import AlreadyAppliedJobs from "../Candidate/AlreadyAppliedJobs/AlreadyAppliedJobs";
import Modal from "../../../../components/common/Modal/Modal";
import PostNewJobs from "../Recruiter/PostNewJob/PostNewJob";
import SimpleSnackbar from "../../../../components/common/Snackbar/Snackbar";

const Navigation = ({ history }: RouteComponentProps) => {
  const userRole: any = parseInt(sessionStorage.getItem("userRole") ?? "");

  const [modalState, setModalState] = useState(false);

  const [snackbarValues, setSnackbarValues] = useState({
    mode: "error",
    message: "",
    state: false,
  });

  const handleSnackbarClose = () => {
    setSnackbarValues({
      mode: "error",
      message: "",
      state: false,
    });
  };

  const navItems = () => {
    if (userRole === USER_TYPE.CANDIDATE) {
      return (
        <li className="nav-item active">
          <a
            className="nav-link"
            role="button"
            type="button"
            onClick={() => setModalState(true)}
          >
            Already Applied Jobs
          </a>
        </li>
      );
    } else {
      return (
        <li className="nav-item">
          <a
            className="nav-link"
            role="button"
            onClick={() => setModalState(true)}
          >
            Post a Job
          </a>
        </li>
      );
    }
  };

  const modalChildren = () => {
    if (userRole === USER_TYPE.CANDIDATE) {
      return <AlreadyAppliedJobs />;
    } else {
      return <PostNewJobs handleStatus={handleJobPostStatus} />;
    }
  };

  const handleJobPostStatus = (res: any) => {
    console.log(res);
    if (res.code === 200 || res.code === 201) {
      setSnackbarValues({
        mode: "success",
        message: "New job successfully posted",
        state: true,
      });
      setModalState(false);
    } else {
      setSnackbarValues({
        mode: "error",
        message: "New job posting error",
        state: true,
      });
      setModalState(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand">Job Portal</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">{navItems()}</ul>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              style={{ background: "none", border: "none" }}
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {sessionStorage.getItem("name")}
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a className="dropdown-item" role="button" onClick={handleLogout}>
                Log Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Modal isOpen={modalState} onClose={() => setModalState(!modalState)}>
        {modalChildren()}
      </Modal>
      <SimpleSnackbar
        message={snackbarValues.message}
        state={snackbarValues.state}
        mode={snackbarValues.mode}
        onClose={() => handleSnackbarClose()}
      />
    </header>
  );
};

export default withRouter(Navigation);
