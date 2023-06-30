import styles from '../styles/Home.module.css';
import AppBarComponent from '../components/Appbar';
import Drawer from '../components/Drawer';
import ReactFlow from "../components/ReactFlow"
import RJSFForm from '../components/RJSF';
import { store } from "../redux/store"
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react';
import { seedFlowData } from "../redux/features/nodeData"
import mockData from "../mock/data.json"
import { Typography } from '@mui/material';


export default function ReduxProvider() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

function Home() {
  const selectedNode = useSelector(state => state.nodeData.selectedNode)
  const isLoading = useSelector(state => state.nodeData.isLoading)
  const formData = useSelector(state => state.nodeData.formData)
  const rjsfSchemaSet = useSelector(state => state.nodeData.rjsfSchema)
  const dispatch = useDispatch();
  
  const [selectedRJSFSchema, setSelectedRJSFSchema] = useState(null);

  useEffect(()=>{
    const rjsfSchema = rjsfSchemaSet.find(schema => schema.id == selectedNode.id)
    setSelectedRJSFSchema(rjsfSchema.schema)
  },[selectedNode])

  // Fetches All the nodes required to rendered on React-FLow
  useEffect(function intialiseReduxDataStoreWithFlowInfo() {
    dispatch(seedFlowData(mockData))
  }, [])

  return (
    <div>
      <AppBarComponent />
      <main>
        <div className={styles.formWrapper}>
          {selectedNode ? <RJSFForm
            isLoading={isLoading}
            schema={selectedRJSFSchema}
            onSubmit={function submitFinalData() {
              console.log("Submitted Data:", formData)
            }}
          /> :
            (<Typography variant='h5'>Select a Node to configure it</Typography>)
          }
        </div>
        <Drawer />
        <ReactFlow />
      </main>
    </div>
  )
}
