import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

interface PropsType {
  label: string;
  type: string
  id:string
  name: string;
  disabled?: boolean
  onChange?: any
}

export default function TextInput({ label,type, ...props }: PropsType) {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={props.name}>{label}</label>
      <input
        type={type}
        className="outline-none border-2 pl-1 bg-medBlack"
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 font-semibold">{meta.error}</div>
      ) : null}
    </div>
  );
}
