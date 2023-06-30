import styles from '../styles/Home.module.css';
import AppBarComponent from '../components/Appbar';
import Drawer from '../components/Drawer';
import ReactFlow from "../components/ReactFlow"
import FormWrapperComponent from '../components/FormWrapperComponent';
import RJSFForm from '../components/RJSF';
import { store } from "../redux/store"
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { seedFlowData, setFormData } from "../redux/features/nodeData"
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
  const dispatch = useDispatch()

  useEffect(function intialiseReduxDataStoreWithFlowInfo() {
    dispatch(seedFlowData(mockData))
  }, [])

  function handleChange(formData) {
    dispatch(setFormData({
      id: selectedNode.id,
      data: formData
    }))
  }

  return (
    <div>
      <AppBarComponent />
      <main>
        <div className={styles.formWrapper}>
          {selectedNode ? <RJSFForm
            isLoading={isLoading}
            schema={selectedNode.rjsfSchema}
            formData={formData[selectedNode.id]}
            onSubmit={() => window.prompt("todo: handle form submit, a post request to mocky")}
            onChange={handleChange} />: 
            (<Typography variant='h5'>Select a Node to configure it</Typography>)
            }
        </div>
        <Drawer />
        {/* <FormWrapperComponent /> */}
        <ReactFlow />
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
