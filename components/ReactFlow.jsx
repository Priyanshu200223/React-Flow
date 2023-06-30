import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';

import 'reactflow/dist/style.css';
import "../styles/custom-node.module.css"
import NodeWithAdornment from './flow-custom-components/nodeWithAdornment';
import nodeData from "../mock/data.json"
import { useDispatch, useSelector } from 'react-redux';
import { registerSchemaForNode, selectNode, setFormData, setLoading } from '../redux/features/nodeData';
import axios from "../api"

export default function ReactFlowImpl() {
  const [nodes, setNodes] = useState(nodeData.nodes);
  const [edges, setEdges] = useState(nodeData.edges);
  const flowState = useSelector(state => state.nodeData.flowData);
  const rjsfSchema = useSelector(state => state.nodeData.rjsfSchema);
  const dispatch = useDispatch();

  /**
   * initialises a node with the node-data by fetching the subsequent resources
   *  
   * @param {*} nodeData The node data, that would contain the high level node information
   */
  async function registerSchemaAndDispatchActions(nodeData) {
    const axiosRes = await axios.get(nodeData.data.schema)
    const defaultData = await axios.get(nodeData.data.default_data);
    dispatch(setFormData({
      id: nodeData.id,
      data: defaultData.data
    }))
    dispatch(registerSchemaForNode({
      id: nodeData.id,
      schema: axiosRes.data
    }))
    dispatch(selectNode({
      id: nodeData.id,
      rjsfSchema: axiosRes.data
    }))
  }


  async function handleNodeClick(_, nodeData) {
    try {
      dispatch(setLoading(true))

      const isSchemaAvailable = rjsfSchema.find(schema => schema.id == nodeData.id)
      if (isSchemaAvailable) {
        dispatch(selectNode({
          id: nodeData.id,
          rjsfSchema: nodeData.rjsfSchema
        }))
      } else {
        await registerSchemaAndDispatchActions(nodeData);
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
        onNodeClick={handleNodeClick}
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
