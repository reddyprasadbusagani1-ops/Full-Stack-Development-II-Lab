import { useState } from "react";

// 2d. Conditional rendering: ternary, && operator, and early return
function Greeting({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <p>Please log in to continue.</p>; // early return
  }
  return <p>Welcome back, student!</p>;
}

function ConditionalRender() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="card">
      <h2>2d. Conditional Rendering</h2>
      <Greeting isLoggedIn={isLoggedIn} />
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"} {/* ternary operator */}
      </button>
      <button onClick={() => setShowDetails(!showDetails)}>Toggle details</button>
      {showDetails && <p className="badge">Details are visible (&amp;&amp; operator).</p>}
    </section>
  );
}

export default ConditionalRender;
