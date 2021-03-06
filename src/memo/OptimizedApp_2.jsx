import React, {
  useState
} from "react";

// ...

let i = 1;

// ...
// Generating prime numbers.
let iterations = 10;
const multiplier = 1000000000;

function calculatePrimes(iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

// ...
// Simulates rendering of "heavy" chart components.
function renderChartComponents() {
  const now = new Date().getTime();
  while (new Date().getTime() < now + 500) {}

  return <p>ACME Chart</p>
}

function Chart({ data }) {
  return (
    <>
      {renderChartComponents()}
      <p>{data.map(d => `${d} `)}</p>
    </>
  )
}

function ChartName() {
  const [chartName, setChartName] = useState('My Chart ' + i);

  return <button onClick={() => setChartName(`My Chart ${++i}`)}>{chartName}</button>
}

export function App() {
  const [dataParam, setDataParam] = useState(iterations);

  const chartData = calculatePrimes(dataParam, multiplier);

  return (
    <>
      <ChartName />
      <button onClick={() => setDataParam(prevDataParam => prevDataParam + 10)}>Generate data</button>

      <Chart data={chartData} />
    </>  
  );
}