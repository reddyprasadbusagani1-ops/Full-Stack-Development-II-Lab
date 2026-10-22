// Shared validation for the student CRUD examples (6d and 6e).
// Returns { errors: [...], value: {...cleaned data...} }
function validateStudent(body, { partial = false } = {}) {
  const errors = [];
  const value = {};
  const data = body && typeof body === "object" ? body : {};

  const has = (key) => data[key] !== undefined && data[key] !== null && data[key] !== "";

  // name
  if (has("name")) {
    if (typeof data.name !== "string" || data.name.trim().length < 2 || data.name.trim().length > 100) {
      errors.push("name must be a string of 2 to 100 characters");
    } else value.name = data.name.trim();
  } else if (!partial) errors.push("name is required");

  // email
  if (has("email")) {
    if (typeof data.email !== "string" || data.email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("email must be a valid email address");
    } else value.email = data.email.trim().toLowerCase();
  } else if (!partial) errors.push("email is required");

  // department
  if (has("department")) {
    if (typeof data.department !== "string" || data.department.trim().length < 2 || data.department.trim().length > 50) {
      errors.push("department must be a string of 2 to 50 characters");
    } else value.department = data.department.trim();
  } else if (!partial) errors.push("department is required");

  // year (1 to 4)
  if (has("year")) {
    const y = Number(data.year);
    if (!Number.isInteger(y) || y < 1 || y > 4) errors.push("year must be a whole number from 1 to 4");
    else value.year = y;
  } else if (!partial) errors.push("year is required");

  // cgpa (optional, 0 to 10)
  if (has("cgpa")) {
    const c = Number(data.cgpa);
    if (Number.isNaN(c) || c < 0 || c > 10) errors.push("cgpa must be a number from 0 to 10");
    else value.cgpa = Math.round(c * 100) / 100;
  }

  if (partial && errors.length === 0 && Object.keys(value).length === 0) {
    errors.push("provide at least one field to update");
  }
  return { errors, value };
}

// Converts a URL parameter into a positive integer id, or returns null.
function parseId(text) {
  const n = Number(text);
  return Number.isInteger(n) && n > 0 ? n : null;
}

module.exports = { validateStudent, parseId };
