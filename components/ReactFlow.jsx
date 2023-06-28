import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';

import 'reactflow/dist/style.css';
import "../styles/custom-node.module.css"
import NodeWithAdornment from './flow-custom-components/nodeWithAdornment';

const initialNodes = [
  { id: '1', type: "defaultNode", position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', type: "defaultNode", position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function ReactFlowImpl() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

// const nodeTypes = useMemo(() => {
//   return {
//     nodeWithAdornment: NodeWithAdornment
//   }
// }, [])

const nodeTypes = {
  defaultNode: NodeWithAdornment
}