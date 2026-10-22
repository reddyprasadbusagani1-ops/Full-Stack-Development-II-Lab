import Counter from "./components/Counter.jsx";
import UserList from "./components/UserList.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import FruitList from "./components/FruitList.jsx";

function App() {
  return (
    <div className="container">
      <h1>Experiment 3: Important React Concepts</h1>
      <div className="grid">
        <Counter />
        <StudentDashboard />
        <FruitList />
        <RegistrationForm />
        <UserList />
      </div>
    </div>
  );
}

export default App;
