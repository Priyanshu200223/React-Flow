import { CircularProgress } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "../../redux/features/nodeData";

/**
 * The Wrapper around RJSF component to manage state of each form
 * 
 * @param {{
 * schema: Object;
 * onSubmit: Function;
 * isLoading: boolean;
 * }} param0 
 * @returns 
 */
export default function RJSFForm({ schema, onSubmit, isLoading }) {
  const selectedNode = useSelector(state => state.nodeData.selectedNode)
  const formData = useSelector(state => state.nodeData.formData)
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
    formData={formData[selectedNode.id]}
    schema={schema}
    onChange={(e) => {
      onRJSFFormChangeCallback(e.formData)
    }}
    validator={validator}
    noHtml5Validate
    onSubmit={onSubmit}
  ></Form>
}
