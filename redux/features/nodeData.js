import { createSlice } from '@reduxjs/toolkit'
import axios from "../../api/axios"

const initialState = {
  flowData: null,
  selectedNode: null,
  isLoading: false,
  formData: {},
  rjsfSchema: []
}

export const nodeDataSlice = createSlice({
  name: 'nodeData',
  initialState,
  reducers: {
    seedFlowData: function initialiseReduxStoreWithData(state, action) {
      // assumption, it is called only on load just to intialise the library
      state.flowData = action.payload;
    },
    registerSchemaForNode: function registerSchemaForNode(state, action) {
      const { id, schema } = action.payload;
      state.rjsfSchema = [...state.rjsfSchema, {id, schema}]
    },
    selectNode: function setSelectNode(state, action) {
      const { id, rjsfSchema } = action.payload
      state.selectedNode = {
        id,
        rjsfSchema
      }
    },
    setLoading: function setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setFormData: function setFormData(state, action) {
      const { data, id } = action.payload;
      state.formData[id] = data;
    }
  },
})

// Action creators are generated for each case reducer function
export const { seedFlowData, registerSchemaForNode, selectNode, setLoading, setFormData } = nodeDataSlice.actions

export default nodeDataSlice.reducer