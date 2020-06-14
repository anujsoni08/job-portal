import React, { useEffect, useState, Fragment } from "react";

import { createJob } from "../../../../../utils/private.api.helper";

const PostNewJobs = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    location: "",
  });

  const handleFormValues = (event: any) => {
    const { value, name } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handlePostNewJob = async (event: any) => {
    event.preventDefault();
    const res = await createJob(formValues);
    console.log(res);
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <h6 className="pb-2 mb-0 text-center">Post Job</h6>
      <hr />
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            onChange={handleFormValues}
            className="form-control"
            placeholder="Enter job title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            type="text"
            onChange={handleFormValues}
            className="form-control"
            placeholder="Enter description"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            type="text"
            onChange={handleFormValues}
            className="form-control"
            placeholder="Enter location"
          />
        </div>

        <div className="text-center">
          <button
            onClick={(event) => handlePostNewJob(event)}
            className="btn btn-primary"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostNewJobs;
