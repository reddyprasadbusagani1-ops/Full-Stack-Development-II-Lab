import { useState } from "react";

// 3a. Counter using the useState hook
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <section className="card">
      <h2>3a. Counter with useState</h2>
      <p className="count">{count}</p>
      <label>
        Step:{" "}
        <input
          type="number"
          min="1"
          value={step}
          onChange={(e) => setStep(Math.max(1, Number(e.target.value) || 1))}
        />
      </label>
      <button onClick={() => setCount((c) => c + step)}>Add {step}</button>
      <button onClick={() => setCount((c) => c - step)}>Subtract {step}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </section>
  );
}

export default Counter;
