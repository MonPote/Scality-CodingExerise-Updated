import { useState, useEffect } from 'react';
import '../App.css';
import fibonacciLogo from '../assets/fibonacci-spiral.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const alertMessage = "Attention: You're Approaching a Threshold!"
const lockMessage = "Dear User, you already reached the threshold, the increment button is locked. Please reset the counter."

const showThresholdToast = (message) => {
  toast(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

function isFibonacci(num) {
  let fib = 0;
  let n = 0;

  const fibonacci = (num) => {
    return num <= 0 ? 0 : num === 1 ? 1 : fibonacci(num - 1) + fibonacci(num - 2);
  }

  while (fib <= num) {
    fib = fibonacci(n);
    if (fib === num) {
      return true;
    }
    n++;
  }
  return false;
}

function Counter() {
  const [count, setCount] = useState(0);
  const [threshold, setThreshold] = useState(15);
  const [isLocked, setIsLocked] = useState(false);

  const isFibonacciNumber = isFibonacci(count);
  const isDisabled = count >= threshold;

  const handleIncrement = () => {
    if (!isLocked) {
      setCount((prevCount) => prevCount + 1);
    }
  }

  const handleReset = () => {
    setCount(0);
    setIsLocked(false);
  }

  const handleThresholdChange = (event) => {
    const newThreshold = parseInt(event.target.value, 10);
    setThreshold(newThreshold);

    if (!isLocked && count >= newThreshold) {
      setIsLocked(true);
    } else if (isLocked && count < newThreshold) {
      setIsLocked(false);
    }
  };

  useEffect(() => {
    if (count === threshold - 5 && count < threshold) {
      setTimeout(() => {
        showThresholdToast(alertMessage);
      }, 200);
    } else if (!isLocked && count >= threshold) {
      setTimeout(() => {
        showThresholdToast(lockMessage);
        setIsLocked(true);
      }, 100);
    }
  }, [count, threshold, isLocked]);

  return (
    <div className="counter">
      <h1 className={isFibonacciNumber ? 'change_color' : ''}>{count}</h1>
      <div className="fibonacci">
        <img className={isFibonacciNumber ? 'highlighter' : ''} src={fibonacciLogo} alt="fibonacci icon" />
        <p className={isFibonacciNumber ? '' : 'none'}>fibonacci</p>
      </div>
      <div className="btn">
        <button className={`btn_plus ${isDisabled ? 'disabled' : ''}`} onClick={handleIncrement} disabled={count >= threshold}>
          Increase
        </button>
        <button className="btn_reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;