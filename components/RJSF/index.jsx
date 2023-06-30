import { CircularProgress } from "@mui/material";
import Form from "@rjsf/mui"
import validator from "@rjsf/validator-ajv8";
import { useState } from "react";
import {  useDispatch, useSelector } from 'react-redux'
import { setFormData } from "../../redux/features/nodeData";

/**
 * The Wrapper around RJSF component to manage state of each form
 * 
 * @param {{
 * schema: Object;
 * formData: Object;
 * onSubmit: Function;
 * isLoading: boolean;
 * }} param0 
 * @returns 
 */
export default function RJSFForm({ schema, formData, onSubmit, isLoading }) {
  const [rjsfFormData, setRjsfFormData] = useState(formData);
  const selectedNode = useSelector(state => state.nodeData.selectedNode)
  const dispatch = useDispatch()

  if (!schema || isLoading) {
    return <CircularProgress />
  }

  function onRJSFFormChangeCallback(formData) {
    dispatch(setFormData({
      id: selectedNode.id,
      data: formData
    }))
  }

  return <Form
    formData={rjsfFormData}
    schema={schema}
    onChange={(e) => {
      setRjsfFormData(e.formData)
      onRJSFFormChangeCallback(e.formData)
    }}
    validator={validator}
    noHtml5Validate
    onSubmit={onSubmit}
  />
}
