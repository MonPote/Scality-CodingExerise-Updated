import { useState } from 'react';
import '../App.css';


function ThresholdInput() {
  const [threshold, setThreshold] = useState(15);

  const handleThresholdChange = (event) => {
    const newThreshold = parseInt(event.target.value, 10);
    setThreshold(newThreshold);
  };

  return (
    <div className="threshold-input">
      <label>Set Threshold: </label>
      <input type="number" value={threshold} onChange={handleThresholdChange} />
    </div>
  );
}

export default ThresholdInput;