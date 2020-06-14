import React, { useState, Fragment, useEffect } from "react";

import { getCandidateAlreadyAppliedJobList } from "../../../../../utils/private.api.helper";
import { JobDetailInterface } from "../../../../../utils/constant";

const AlreadyAppliedJobs = () => {
  const [jobList, setJobList] = useState([]);

  const getAppliedJobListing = async () => {
    const res = await getCandidateAlreadyAppliedJobList();
    setJobList(res.data.data ?? []);
  };

  useEffect(() => {
    getAppliedJobListing();
  }, []);

  return (
    <Fragment>
      <h6 className="border-bottom border-gray pb-2 mb-0">Already Applied Jobs</h6>
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        {jobList.length
          ? jobList.map((jobDetail : JobDetailInterface) => {
              return (
                <div className="media text-muted pt-3" key={jobDetail.id}>
                  <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <strong className="text-gray-dark">{jobDetail.title}</strong>
                    </div>
                    <span className="d-block">Location : {jobDetail.location}</span>
                    <span className="d-block">
                      Description : {jobDetail.description}
                    </span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Fragment>
  );
};

export default AlreadyAppliedJobs;
