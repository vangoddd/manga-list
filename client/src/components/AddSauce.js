import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddSauce = ({ onAdd }) => {
  const [code, setCode] = useState("");
  const [tag, setTag] = useState("");

  const checkSauce = (sauceInput) => {
    if (
      sauceInput.match(/^[0-9]+$/) &&
      sauceInput.length > 4 &&
      sauceInput.length < 7
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!code || !tag || !checkSauce(code)) {
      alert("Please enter valid code and tag");
      return;
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
                className="form-control form-bar"
                placeholder="177013"
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
                className="form-control form-bar"
                placeholder="Sad"
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
            <div className="row">
              <div className="col-12 col-sm-6">
                <button
                  type="submit"
                  className="btn w-100 btn-outline-primary white"
                >
                  Submit
                </button>
              </div>
              <div className="col-12 col-sm-6 my-sm-0 my-2">
                <Link to="/">
                  <button
                    type="button"
                    className="btn w-100 btn-block btn-outline-danger white"
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSauce;
