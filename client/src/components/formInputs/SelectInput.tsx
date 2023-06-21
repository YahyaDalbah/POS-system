import React from 'react'
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

interface PropsType {
    children: any
  label: string;
  id: string;
  name: string;
  onChange?: any
}

export default function SelectInput({children,label,...props}: PropsType) {
    const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <select
        className="outline-none border-2 p-1 bg-medBlack ml-4"
        {...field}
        {...props}
      >
        {children}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 font-semibold">{meta.error}</div>
      ) : null}
    </div>
  );
}
