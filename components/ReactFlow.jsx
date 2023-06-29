import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';

import 'reactflow/dist/style.css';
import "../styles/custom-node.module.css"
import NodeWithAdornment from './flow-custom-components/nodeWithAdornment';
import nodeData from "../mock/data.json"

export default function ReactFlowImpl() {
  const [nodes, setNodes] = useState(nodeData.nodes);
  const [edges, setEdges] = useState(nodeData.edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ width: '80vw', height: '100vh' }}>
      <ReactFlow
        style={{zIndex: -2}}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

const nodeTypes = {
  defaultNode: NodeWithAdornment
}
