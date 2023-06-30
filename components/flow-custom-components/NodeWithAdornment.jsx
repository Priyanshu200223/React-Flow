import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { } from "@mui/icons-material";
import { Typography } from '@mui/material';

export function NodeComponent({ data, ...otherProps }) {
  return (
    <div
      onClick={(data)=> console.log("clicked", {data, otherProps})}
      style={{ display: "flex", padding: "0.675rem", borderRadius: "8px", border: "2px solid #e2e2e2", alignItems: "center", minWidth: "240px", backgroundColor: "#fff" }}
    >
      <div style={{ borderRadius: 8, backgroundColor: data.background, marginRight: 8, height: 40, width: 40 }}>
        <img src={data.svg || "/assets/fallback.svg"} height="40" width="40" style={{ padding: "0.6rem" }} />
      </div>
      <Typography fontStyle="bold">{data.label}</Typography>
    </div>
  )
}

function NodeWithAdornment({ data, isConnectable, ...otherProps }) {
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
