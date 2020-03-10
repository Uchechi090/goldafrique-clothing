import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {//this to dynamically generate the label
    label ? (
      <label
        className={
          `${
            otherProps.value.length ? "shrink" : " "
          } form-input-label` /* this adds the "shrink class whenever the user has typed anything in" */
        }
      >
        {" "}
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
