import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import "./index.css";
import { USER_TYPE } from "../../../../utils/constant";
import AlreadyAppliedJobs from "../Candidate/AlreadyAppliedJobs/AlreadyAppliedJobs";
import Modal from "../../../../components/common/Modal/Modal";
import PostNewJobs from "../Recruiter/PostNewJob/PostNewJob";

const Navigation = ({ history }: RouteComponentProps) => {
  const userRole: any = parseInt(sessionStorage.getItem("userRole") ?? "");

  const [modalState, setModalState] = useState(false);

  const navItems = () => {
    if (userRole === USER_TYPE.CANDIDATE) {
      return (
        <li className="nav-item active">
          <a
            className="nav-link"
            role="button"
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
      return <PostNewJobs />;
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
    </header>
  );
};

export default withRouter(Navigation);
