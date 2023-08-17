function generateFibonacciArray(length) {
    const fibonacciArray = [];
  
    for (let i = 0; i < length; i++) {
      fibonacciArray.push(fibonacci(i));
    }
  
    return fibonacciArray;
  }
  
  function fibonacci(num) {
    return num <= 0 ? 0 : num === 1 ? 1 : fibonacci(num - 1) + fibonacci(num - 2);
  }

console.log(generateFibonacciArray(10) )