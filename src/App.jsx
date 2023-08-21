import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import ThresholdInput from "./components/ThresholdInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [threshold, setThreshold] = useState(15);
  return (
    <div className="app">
      <h1>COUNTER</h1>
      <Counter threshold={threshold} />
      <ThresholdInput threshold={threshold} setThreshold={setThreshold} />
      <ToastContainer />
    </div>
  );
}

export default App;
