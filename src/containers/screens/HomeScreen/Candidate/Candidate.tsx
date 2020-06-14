import React, { useEffect, useState, Fragment } from "react";

import {
  getAvailableJobList,
  applyCandidateJob,
} from "../../../../utils/private.api.helper";
import { JobDetailInterface } from "../../../../utils/constant";

const Candidate = () => {
  const [jobList, setJobList] = useState([]);

  const getJobListing = async () => {
    const res = await getAvailableJobList();
    setJobList(res.data.data ?? []);
  };

  useEffect(() => {
    getJobListing();
  }, []);

  const handleApplyJob = async (jobId: string) => {
    const params = {
      jobId,
    };
    const res = await applyCandidateJob(params);
  };

  return (
    <div className="my-3 p-3 bg-white rounded shadow-sm">
      {jobList.length ? (
        <Fragment>
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Available Jobs
          </h6>
          {jobList.map((jobDetail: JobDetailInterface) => {
            return (
              <div className="media text-muted pt-3" key={jobDetail.id}>
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <strong className="text-gray-dark">
                      {jobDetail.title}
                    </strong>
                    <a
                      role="button"
                      onClick={() => handleApplyJob(jobDetail.id)}
                    >
                      Apply
                    </a>
                  </div>
                  <span className="d-block">
                    Location : {jobDetail.location}
                  </span>
                  <span className="d-block">
                    Description : {jobDetail.description}
                  </span>
                </div>
              </div>
            );
          })}
        </Fragment>
      ) : (
        <h6 className=" pb-2 mb-0">No Job Available</h6>
      )}
    </div>
  );
};

export default Candidate;
