import { useRef, useState } from "react";

const emptyForm = { name: "", email: "", age: "", course: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = "Name must have at least 3 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  const age = Number(values.age);
  if (!values.age || !Number.isInteger(age) || age < 16 || age > 60) errors.age = "Age must be a whole number between 16 and 60.";
  if (!values.course) errors.course = "Please choose a course.";
  return errors;
}

// 3d. Controlled form with basic validation
function RegistrationForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [entries, setEntries] = useState([]);
  const nextId = useRef(1); // gives each saved entry a stable key

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop page reload
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setEntries((prev) => [...prev, { id: nextId.current++, ...values }]);
      setValues(emptyForm);
    }
  }

  return (
    <section className="card">
      <h2>3d. Controlled Form + Validation</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input name="name" value={values.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Email
          <input name="email" type="email" value={values.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Age
          <input name="age" type="number" value={values.age} onChange={handleChange} />
          {errors.age && <span className="error">{errors.age}</span>}
        </label>
        <label>
          Course
          <select name="course" value={values.course} onChange={handleChange}>
            <option value="">-- choose --</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="MySQL">MySQL</option>
          </select>
          {errors.course && <span className="error">{errors.course}</span>}
        </label>
        <button type="submit">Register</button>
      </form>

      <h3>Registered ({entries.length})</h3>
      {entries.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <ul className="list">
          {entries.map((e) => (
            <li key={e.id}>
              {e.name} - {e.email} - age {e.age} - {e.course}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RegistrationForm;
