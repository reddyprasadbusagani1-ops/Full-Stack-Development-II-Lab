import { useState } from "react";

// 2e. Display text using template literals
function TemplateLiteralDemo() {
  const [name, setName] = useState("Asha");
  const [marks, setMarks] = useState(75);
  const grade = marks >= 90 ? "A+" : marks >= 75 ? "A" : marks >= 60 ? "B" : "C";
  const message = `${name || "Student"} scored ${marks} marks and earned grade ${grade}.`;

  return (
    <section className="card">
      <h2>2e. Template Literals</h2>
      <label>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Marks:{" "}
        <input
          type="number"
          min="0"
          max="100"
          value={marks}
          onChange={(e) => setMarks(Number(e.target.value))}
        />
      </label>
      <p className="highlight">{message}</p>
    </section>
  );
}

export default TemplateLiteralDemo;
