import { configureStore } from '@reduxjs/toolkit'
import nodeDataReducer from './features/nodeData'

export const store = configureStore({
  reducer: {
    nodeData: nodeDataReducer
  },
})