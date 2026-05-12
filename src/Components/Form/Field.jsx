import React from "react";
import { Field as FormikField, ErrorMessage } from "formik";
import Select from "react-select";

/* FIELD */
function Field({ name, title, component, required, getTypeError, ...rest }) {
  const validate = (value) => {
    let error;
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (!isEmpty) {
      error = getTypeError(value);
    } else {
      if (required) {
        error = "Required";
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
        {required && <span className="required-mark"> *</span>}
      </span>
      <div>
        <FormikField
          validate={validate}
          name={name}
          component={component}
          {...rest}
        />

        <div className="field-error-space">
          <ErrorMessage name={name}>
            {(msg) => {
              return <div className="field-error">{msg}</div>;
            }}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
}

/* TEXT */
const Text = ({ style, className, allow, maxLength, minLength, ...props }) => {
  const textField = ({ field }) => {
    return (
      <input
        style={style}
        className={className || "form-control"}
        type="text"
        {...field}
      />
    );
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
  const numberField = ({ field }) => {
    return (
      <input
        type="number"
        style={style}
        className={className || "form-control"}
        value={field.value ?? ""}
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

/* TEXTAREA */
const TextArea = ({
  style,
  className,
  maxLength,
  minLength,
  rows = 4,
  ...props
}) => {
  const textareaField = ({ field }) => {
    return (
      <textarea
        style={style}
        className={className || "form-control textarea-control"}
        rows={rows}
        {...field}
      />
    );
  };

  const getTypeError = (value) => {
    let error;
    if (minLength && value.length < minLength) {
      error = `Enter minimum ${minLength} characters.`;
    } else if (maxLength && value.length > maxLength) {
      error = `Cannot exceed ${maxLength} characters.`;
    }
    return error;
  };

  return (
    <Field component={textareaField} getTypeError={getTypeError} {...props} />
  );
};

/* DATE */
const DateField = ({ style, className, maxDate, minDate, ...props }) => {
  const dateField = ({ field }) => {
    return (
      <input
        type="date"
        style={style}
        className={className || "form-control"}
        max={maxDate}
        min={minDate}
        {...field}
      />
    );
  };

  const getTypeError = (value) => {
    let error;
    if (minDate && value < minDate) {
      error = `Date cannot be before ${minDate}.`;
    } else if (maxDate && value > maxDate) {
      error = `Date cannot be after ${maxDate}.`;
    }
    return error;
  };

  return <Field component={dateField} getTypeError={getTypeError} {...props} />;
};

/* CHECKBOX */
const Checkbox = ({ style, className, label, ...props }) => {
  const checkboxField = ({ field }) => {
    return (
      <label className="checkbox-control">
        <input
          type="checkbox"
          style={style}
          className={className}
          checked={field.value}
          {...field}
        />
        <span>{label}</span>
      </label>
    );
  };

  const getTypeError = () => {
    return "";
  };

  return (
    <Field component={checkboxField} getTypeError={getTypeError} {...props} />
  );
};

const SelectOption = ({
  options,
  className,
  ...props
}) => {
  const SelectField = ({ field, form }) => {
    return (
      <Select
        className={className}
        classNamePrefix="form-select"
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

const MultiSelectOption = ({ options, className, ...props }) => {
  const MultiSelectField = ({ field, form }) => {
    return (
      <Select
        className={className}
        classNamePrefix="form-select"
        closeMenuOnSelect={false}
        isMulti
        name={field.name}
        onChange={(val) => {
          form.setFieldValue(field.name, val || []);
        }}
        options={options}
        value={field.value}
      />
    );
  };

  const getTypeError = () => {
    return "";
  };

  return (
    <Field
      component={MultiSelectField}
      getTypeError={getTypeError}
      {...props}
    />
  );
};

export {
  Text,
  Nummber,
  TextArea,
  DateField,
  Checkbox,
  SelectOption,
  MultiSelectOption,
};
