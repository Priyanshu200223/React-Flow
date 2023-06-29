import { CircularProgress } from "@mui/material";
import Form from "@rjsf/mui"
import validator from "@rjsf/validator-ajv8";
import { useEffect, useState } from "react";

export default function RJSFForm({ schema, formData, onSubmit, onChange: onChangeCallback, isLoading }) {
  const [rjsfFormData, setRjsfFormData] = useState(formData);

  return <Form
    formData={rjsfFormData}
    schema={schema}
    onChange={(e) => {
      setRjsfFormData(e.formData)
      onChangeCallback(e.formData)
    }}
    validator={validator}
    noHtml5Validate
    onSubmit={onSubmit}
  ><></></Form>
}
