import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// 3b. Fetch data from an API using useEffect (with loading and error handling)
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController(); // cancel the request if the component unmounts

    async function loadUsers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort(); // cleanup function
  }, [reloadKey]); // run again when reloadKey changes

  return (
    <section className="card wide">
      <h2>3b. Fetch API Data with useEffect</h2>
      <button onClick={() => setReloadKey((k) => k + 1)}>Reload</button>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul className="list">
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} ({user.address.city})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserList;
