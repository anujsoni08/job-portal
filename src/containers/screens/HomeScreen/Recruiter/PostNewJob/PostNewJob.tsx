import React, { useState } from "react";

import { createJob } from "../../../../../utils/private.api.helper";

const PostNewJob = (props: any) => {
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
    props.handleStatus(res.data);
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <h6 className="pb-2 mb-0 text-center">Post Job</h6>
      <hr />
      <form>
        <div className="form-group row">
          <label htmlFor="title" className="col-sm-3 col-form-label">
            Title
          </label>
          <div className="col-sm-9">
            <input
              name="title"
              id="title"
              type="text"
              onChange={handleFormValues}
              className="form-control"
              placeholder="Enter job title"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="description" className="col-sm-3 col-form-label">
            Description
          </label>
          <div className="col-sm-9">
            <input
              name="description"
              id="description"
              type="text"
              onChange={handleFormValues}
              className="form-control"
              placeholder="Enter description"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="location" className="col-sm-3 col-form-label">
            Location
          </label>
          <div className="col-sm-9">
            <input
              name="location"
              id="location"
              type="text"
              onChange={handleFormValues}
              className="form-control"
              placeholder="Enter location"
            />
          </div>
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

export default PostNewJob;
