import { useState } from "react";

// 2b. Counter using a FUNCTIONAL component
function FunctionCounter() {
  const [count, setCount] = useState(0);

  return (
    <section className="card">
      <h2>2b. Functional Component Counter</h2>
      <p className="count">{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </section>
  );
}

export default FunctionCounter;
