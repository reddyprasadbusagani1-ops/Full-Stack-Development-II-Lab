import { useState } from "react";
import StudentCard from "./StudentCard.jsx";

const students = [
  { id: 1, name: "Asha", department: "AI&DS", marks: 82 },
  { id: 2, name: "Ravi", department: "AI&DS", marks: 35 },
  { id: 3, name: "Sita", department: "CSE", marks: 67 },
];

// 3c (parent): owns the data and passes it to child components via props
function StudentDashboard() {
  const [selected, setSelected] = useState("nobody");

  return (
    <section className="card">
      <h2>3c. Sharing Data with Props</h2>
      <p>
        Selected student: <strong>{selected}</strong>
      </p>
      {students.map((s) => (
        <StudentCard
          key={s.id}
          name={s.name}
          department={s.department}
          marks={s.marks}
          onSelect={setSelected}
        />
      ))}
    </section>
  );
}

export default StudentDashboard;
