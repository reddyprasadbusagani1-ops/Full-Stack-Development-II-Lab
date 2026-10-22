// 3c (child): receives data ONLY through props
function StudentCard({ name, department, marks, onSelect }) {
  const status = marks >= 40 ? "Pass" : "Fail";
  return (
    <div className="mini-card">
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>
        Marks: {marks} ({status})
      </p>
      <button onClick={() => onSelect(name)}>Select</button>
    </div>
  );
}

export default StudentCard;
