import React from "react";
import { Formik, Form as FormikForm } from "formik";
import "./form-style.css";

const Form = (props) => {
  const { children, columns = 2, theme = "teal", ...formikProps } = props;
  const formColumns = Math.min(Math.max(Number(columns) || 1, 1), 5);

  return (
    <Formik {...formikProps}>
      {() => {
        return (
          <FormikForm
            className={`form-shell form-theme-${theme} form-columns-${formColumns}`}
            style={{ "--form-columns": formColumns }}
          >
            {children}
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
