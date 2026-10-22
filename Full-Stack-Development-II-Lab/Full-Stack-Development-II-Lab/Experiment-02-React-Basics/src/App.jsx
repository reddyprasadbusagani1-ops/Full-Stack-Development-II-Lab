import ClassCounter from "./components/ClassCounter.jsx";
import FunctionCounter from "./components/FunctionCounter.jsx";
import ButtonClickDemo from "./components/ButtonClickDemo.jsx";
import ConditionalRender from "./components/ConditionalRender.jsx";
import TemplateLiteralDemo from "./components/TemplateLiteralDemo.jsx";

function App() {
  return (
    <div className="container">
      <h1>Experiment 2: Basics of React.js</h1>
      <div className="grid">
        <ClassCounter />
        <FunctionCounter />
        <ButtonClickDemo />
        <ConditionalRender />
        <TemplateLiteralDemo />
      </div>
    </div>
  );
}

export default App;
