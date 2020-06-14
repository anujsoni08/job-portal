import React, { useEffect, useState, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router";

import {
  deleteJob,
  getRecruiterPostedJobList,
} from "../../../../utils/private.api.helper";
import "./index.css";
import JobDetail from "../../../../components/common/JobDetail/JobDetail";
import Modal from "../../../../components/common/Modal/Modal";
import { JobDetailInterface } from "../../../../utils/constant";

const Recruiter = () => {
  const [jobList, setJobList] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");

  const [modalState, setModalState] = useState(false);

  const getJobListing = async () => {
    const res = await getRecruiterPostedJobList();
    if (res.data.code === 200) {
      setJobList(res.data.data.data);
    } else {
      setJobList([]);
    }
  };

  useEffect(() => {
    getJobListing();
  }, []);

  const handleDeleteJob = async (jobId: string) => {
    const params = {
      jobId,
    };
    const res = await deleteJob(params);
  };

  const handleModalClose = () => {
    setModalState(!modalState);
  };

  return (
    <Fragment>
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        {jobList.length ? (
          <Fragment>
            <h6 className="border-bottom border-gray pb-2 mb-0">Posted Jobs</h6>
            {jobList.map((jobDetail: JobDetailInterface) => {
              return (
                <div className="media text-muted pt-3" key={jobDetail.id}>
                  <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <strong
                        className="text-gray-dark clickable"
                        onClick={() => {
                          setSelectedJobId(jobDetail.id);
                          setModalState(true);
                        }}
                      >
                        {jobDetail.title}
                      </strong>
                      <div className="dropdown">
                        <IconButton
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a
                            className="dropdown-item"
                            role="button"
                            onClick={() => {
                              setSelectedJobId(jobDetail.id);
                              setModalState(true);
                            }}
                          >
                            View Job Details
                          </a>
                          <a
                            role="button"
                            className="dropdown-item"
                            onClick={() => handleDeleteJob(jobDetail.id)}
                          >
                            Delete Job
                          </a>
                        </div>
                      </div>
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
          <h6 className="pb-2 mb-0">No Job Posted</h6>
        )}
      </div>
      <Modal isOpen={modalState} onClose={() => handleModalClose()}>
        <JobDetail jobId={selectedJobId} />
      </Modal>
    </Fragment>
  );
};

export default withRouter(Recruiter);
