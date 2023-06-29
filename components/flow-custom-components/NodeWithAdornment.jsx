import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { } from "@mui/icons-material";
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerSchemaForNode, selectNode, setLoading } from '../../redux/features/nodeData';
import axios from "../../api"

const handleStyle = { left: 10 };

export function NodeComponent({ data, ...otherProps }) {
  const flowState = useSelector(state => state.nodeData.flowData);
  const dispatch = useDispatch();

  async function handleClick() {
    try {
      dispatch(setLoading(true))
      if (flowState.nodes) {
        console.log("flowState", flowState)
        const nodeData = flowState.nodes.find(node => node.id === otherProps.id);
        if (nodeData.rjsfSchema) {
          dispatch(selectNode({
            id: nodeData.id,
            rjsfSchema: nodeData.rjsfSchema
          }))
        } else {
          // register schema, as to prevent subsequent loading and dispatch action
          const axiosRes = await axios.get(nodeData.data.schema)
          dispatch(registerSchemaForNode({
            id: nodeData.id,
            schema: axiosRes.data
          }))
          dispatch(selectNode({
            id: nodeData.id,
            rjsfSchema: axiosRes.data
          }))
        }
      }
    } catch (e) {
      // TODO handle gracefully
      console.error(e)
      window.prompt("an error occured while fetching schema, check console", e)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{ display: "flex", padding: "0.675rem", borderRadius: "8px", border: "2px solid #e2e2e2", alignItems: "center", minWidth: "240px", backgroundColor: "#fff" }}
    >
      <div style={{ borderRadius: 8, backgroundColor: data.background, marginRight: 8, height: 40, width: 40 }}>
        <img src={data.svg || "/assets/account.svg"} height="40" width="40" style={{ padding: "0.6rem" }} />
      </div>
      <Typography fontStyle="bold">{data.label}</Typography>
    </div>
  )
}

function NodeWithAdornment({ data, isConnectable, ...otherProps }) {
  console.log("see this...", { data, ...otherProps })
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <NodeComponent data={data} {...otherProps} />
      <Handle type="source" position={Position.Bottom} id={otherProps.id} isConnectable={isConnectable} />
    </div>
  );
}

export default NodeWithAdornment;
