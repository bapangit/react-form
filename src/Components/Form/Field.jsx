import React, { useState } from "react";
import { Field as FormikField, ErrorMessage } from "formik";
import Select from "react-select";

/* FIELD */
function Field({ name, title, component, required, getTypeError, ...rest }) {
  const validate = (value) => {
    let error;
    if (value) {
      error = getTypeError(value);
    } else {
      if (required) {
        error = "Required !";
      }
    }

    return error;
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

        <div style={{ height: "15px" }}>
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
const Text = ({ style, className, allow, maxLength, minLength, ...props }) => {
  const textField = ({ field, form }) => {
    return <input style={style} className={className} type="text" {...field} />;
  };

  const getTypeError = (value) => {
    let error;
    if (
      allow === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      error = "Enter a valid email address.";
    } else if (
      allow === "phone" &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(value)
    ) {
      error = "Enter a valid phone number.";
    } else if (allow === "int" && !/^([0-9]+)$/i.test(value)) {
      error = "Enter a integer value.";
    } else if (allow === "float" && !/^([0-9]+(\.)[0-9]+)$/i.test(value)) {
      error = "Enter a float value.";
    } else if (minLength && value.length < minLength) {
      error = `Enter minimum ${minLength} characters.`;
    } else if (maxLength && value.length > maxLength) {
      error = `Cannot maximum ${maxLength} characters.`;
    }
    return error;
  };
  return <Field component={textField} getTypeError={getTypeError} {...props} />;
};

/* NUMBER */
const Nummber = ({ style, className, allow, maxValue, minValue, ...props }) => {
  const numberField = ({ field, form }) => {
    return (
      <input
        type="number"
        style={style}
        className={className}
        value={Number(field.value)}
        {...field}
      />
    );
  };

  const getTypeError = (value) => {
    let error;
    if (allow === "int" && !/^([0-9]+)$/i.test(value)) {
      error = "Enter an integer value.";
    } else if (allow === "float" && !/^([0-9]+(\.)[0-9]+)$/i.test(value)) {
      error = "Enter a float value.";
    } else if (maxValue && value > maxValue) {
      error = `Value cannot be more than ${maxValue}`;
    } else if (minValue && value < minValue) {
      error = `Value cannot be less than ${minValue}`;
    }
    return error;
  };

  return (
    <Field component={numberField} getTypeError={getTypeError} {...props} />
  );
};

const SelectOption = ({
  options,
  style,
  className,
  allow,
  maxLength,
  minLength,
  ...props
}) => {
  const SelectField = ({ field, form }) => {
    return (
      <Select
        defaultValue={field.value}
        value={field.value}
        onChange={(val) => {
          form.setFieldValue(field.name, val);
        }}
        name={field.name}
        options={options}
      />
    );
  };

  const getTypeError = (value) => {
    return "";
  };
  return (
    <Field component={SelectField} getTypeError={getTypeError} {...props} />
  );
};

export { Text, Nummber, SelectOption };
