import React from "react";

import "./index.css";
import Candidate from "../Candidate/Candidate";
import Recruiter from "../Recruiter/Recruiter";
import { USER_TYPE } from "../../../../utils/constant";

const Main = () => {
  const renderScreen = () => {
    const userRole = parseInt(sessionStorage.getItem("userRole") ?? "");
    if (!!userRole) {
      if (userRole === USER_TYPE.CANDIDATE) {
        return <Candidate />;
      } else {
        return <Recruiter />;
      }
    }
  };

  return <main role="main">{renderScreen()}</main>;
};

export default Main;
