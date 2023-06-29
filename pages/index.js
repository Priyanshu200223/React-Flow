import styles from '../styles/Home.module.css';
import AppBarComponent from '../components/Appbar';
import Drawer from '../components/Drawer';
import ReactFlow from "../components/ReactFlow"
import FormWrapperComponent from '../components/FormWrapperComponent';
import RJSFForm from '../components/RJSF';

export default function Home() {
  return (
    <div>
      <AppBarComponent />
      <main>
      <div className={styles.formWrapper}>
        <RJSFForm />
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
