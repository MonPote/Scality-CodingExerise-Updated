import './App.css';
import Counter from './components/Counter';
import ThresholdInput from './components/ThresholdInput';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="app">
      <h1>COUNTER</h1>
      <Counter />
      <ThresholdInput />
      <ToastContainer />
    </div>
  );
}


export default App