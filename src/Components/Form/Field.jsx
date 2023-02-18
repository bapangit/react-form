import React, { useState } from "react";
import { Field as FormikField, ErrorMessage } from "formik";

function Field({
  name,
  title,
  children,
  component,
  allow,
  maxLen,
  minLen,
  required,
  getTypeError,
  ...props
}) {
  const validate = (value) => {
    let error;

    if (required && !value) {
      return "Required !";
    }

    return getTypeError(value);
  };
  return (
    <div className="entire-field">
      <span
        className="field-title"
        style={title ? {} : { textTransform: "capitalize" }}
      >
        {title || `${name}`.replace(/([A-Z])/g, " $1").trim()}
      </span>
      <div>
        <FormikField validate={validate} name={name} component={component} />

        <div style={{ height: "15px", marginBottom: "4px" }}>
          <ErrorMessage name={name}>
            {(msg) => {
              return (
                <div
                  style={{ lineHeight: "12px", color: "red", fontSize: "12px" }}
                >
                  {msg}
                </div>
              );
            }}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
}

/* TEXT */
const Text = ({ style, className, ...props }) => {
  const textField = ({ field, form }) => {
    return <input style={style} className={className} type="text" {...field} />;
  };

  const getTypeError = (val) => {
    console.log("text type error", val);
  };
  return <Field component={textField} getTypeError={getTypeError} {...props} />;
};

/* NUMBER */
const Nummber = ({ style, className, ...props }) => {
  const numberField = ({ field, form }) => {
    return (
      <input type="number" style={style} className={className} {...field} />
    );
  };

  const getTypeError = (val) => {
    console.log("number type error", val);
  };

  return (
    <Field component={numberField} getTypeError={getTypeError} {...props} />
  );
};

export { Text, Nummber };
