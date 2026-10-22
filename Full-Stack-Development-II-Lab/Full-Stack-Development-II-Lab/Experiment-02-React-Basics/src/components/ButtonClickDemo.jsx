import { useState } from "react";

// 2c. Button click handling in a functional component
function ButtonClickDemo() {
  const [message, setMessage] = useState("No button clicked yet.");

  function handleSimpleClick() {
    setMessage("You clicked the simple button.");
  }

  function handleWithArgument(name) {
    setMessage(`Hello, ${name}! This click passed an argument.`);
  }

  function handleEvent(event) {
    setMessage(`Event type: ${event.type}, button text: "${event.target.textContent}"`);
  }

  return (
    <section className="card">
      <h2>2c. Button Click Handling</h2>
      <button onClick={handleSimpleClick}>Simple click</button>
      <button onClick={() => handleWithArgument("Student")}>Click with argument</button>
      <button onClick={handleEvent}>Show event info</button>
      <p>{message}</p>
    </section>
  );
}

export default ButtonClickDemo;
