import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';

import 'reactflow/dist/style.css';
import "../styles/custom-node.module.css"
import NodeWithAdornment from './flow-custom-components/nodeWithAdornment';
import nodeData from "../mock/data.json"
import { useDispatch, useSelector } from 'react-redux';
import { registerSchemaForNode, selectNode, setLoading } from '../redux/features/nodeData';
import axios from "../api"

export default function ReactFlowImpl() {
  const [nodes, setNodes] = useState(nodeData.nodes);
  const [edges, setEdges] = useState(nodeData.edges);
  const flowState = useSelector(state => state.nodeData.flowData);
  const dispatch = useDispatch();

  function handleClick(_, nodeData) {
    try {
      dispatch(setLoading(true))

      const id = nodeData.id;
      if (flowState.nodes) {
        const nodeData = flowState.nodes.find(node => node.id === id);
        if (nodeData.rjsfSchema) {
          dispatch(selectNode({
            id: nodeData.id,
            rjsfSchema: nodeData.rjsfSchema
          }))
        } else {
          // register schema, as to prevent subsequent loading and dispatch action
          axios.get(nodeData.data.schema).then((axiosRes) => {
            dispatch(registerSchemaForNode({
              id: nodeData.id,
              schema: axiosRes.data
            }))
            dispatch(selectNode({
              id: nodeData.id,
              rjsfSchema: axiosRes.data
            }))
          })

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
        style={{ zIndex: -2 }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={handleClick}
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
