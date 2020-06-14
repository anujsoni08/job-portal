import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router";

import { getJobDetail } from "../../../utils/private.api.helper";

interface PropsInterface {
  jobId?: string;
}

const JobDetail = (props: any) => {
  const [jobDetail, setJobDetail] = useState({
    title: "",
    location: "",
    description: "",
  });

  const handleJobDetail = async () => {
    const jobId: string = props.jobId;
    const res = await getJobDetail(jobId);
    setJobDetail(res.data.data ?? {});
  };

  useEffect(() => {
    handleJobDetail();
  }, []);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{jobDetail.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{jobDetail.location}</h6>
        <p className="card-text">{jobDetail.description}</p>
      </div>
    </div>
  );
};

export default withRouter(JobDetail);
