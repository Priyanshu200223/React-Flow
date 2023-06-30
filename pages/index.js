import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppBarComponent from '../components/Appbar';
import Drawer from '../components/Drawer';
import RJSFForm from '../components/RJSF';
import ReactFlow from "../components/ReactFlow";
import mockData from "../mock/data.json";
import { seedFlowData } from "../redux/features/nodeData";
import { store } from "../redux/store";
import styles from '../styles/Home.module.css';

export default function ReduxProvider() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

let timer;

function Home() {
  const selectedNode = useSelector(state => state.nodeData.selectedNode)
  const isLoading = useSelector(state => state.nodeData.isLoading)
  const formData = useSelector(state => state.nodeData.formData)
  const rjsfSchemaSet = useSelector(state => state.nodeData.rjsfSchema)
  const dispatch = useDispatch();
  const [selectedRJSFSchema, setSelectedRJSFSchema] = useState(null);

  // Fetches All the nodes required to rendered on React-FLow
  useEffect(function intialiseReduxDataStoreWithFlowInfo() {
    dispatch(seedFlowData(mockData))
  }, [])

  // if a node is selected, then its respective rjsf schema has to be loaded
  useEffect(() => {
    const rjsfSchema = rjsfSchemaSet.find(schema => schema.id == selectedNode.id)
    setSelectedRJSFSchema(rjsfSchema?.schema)
  }, [selectedNode])

  // a debounced data post effect that will keep the data up-to-date with server
  useEffect(()=>{
    clearTimeout(timer);
    timer = setTimeout(function postCurrentFormData() {
      console.log("posting data...", formData)
    },1000)
  },[formData])

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
