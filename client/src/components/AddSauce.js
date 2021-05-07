import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddSauce = ({ onAdd }) => {
  const [code, setCode] = useState("");
  const [tag, setTag] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!code || !tag) {
      alert("Please enter code and tag");
    }

    const lowerCaseTag = tag.toLowerCase();
    console.log(tag);

    onAdd({ code, lowerCaseTag });

    alert("Code submitted, thanks for your contribution <3");

    setCode("");
    setTag("");
  };

  return (
    <>
      <hr className="divider"></hr>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Code</label>
              <input
                className="form-control"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <div className="form-text">6-digit nhentai code</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Tag</label>
              <input
                className="form-control"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
              <div className="form-text">Primary tag of the sauce</div>
            </div>
            <div className="mb-3">
              <span>Please dont spam, only submit the best one</span>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/">
              <button className="btn btn-danger">Back</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSauce;
