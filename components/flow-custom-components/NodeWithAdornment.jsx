import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import {  } from "@mui/icons-material";
import { Typography } from '@mui/material';

const handleStyle = { left: 10 };

export function NodeComponent({data}) {
  return (
    <div style={{ display: "flex", padding: "0.675rem", borderRadius: "8px", border: "2px solid #e2e2e2", alignItems: "center", minWidth: "240px", backgroundColor: "#fff"}}>
      <div style={{borderRadius: 8, backgroundColor: data.background, marginRight: 8, height: 40, width: 40}}>
        <img src={data.svg || "/assets/account.svg"} height="40" width="40" style={{padding: "0.6rem"}} />
      </div>
      <Typography fontStyle="bold">{data.label}</Typography>
    </div>
  )
}

function NodeWithAdornment({ data, isConnectable }) {
  console.log("data", data)
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        <NodeComponent data={data} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default NodeWithAdornment;
