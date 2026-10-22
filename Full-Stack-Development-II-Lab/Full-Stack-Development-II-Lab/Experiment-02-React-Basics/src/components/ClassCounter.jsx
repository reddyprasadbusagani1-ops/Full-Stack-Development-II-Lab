import React from "react";

// 2a. Counter using a CLASS component
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this); // so "this" works inside the handler
  }

  increment() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }

  decrement = () => {
    this.setState((prev) => ({ count: prev.count - 1 }));
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <section className="card">
        <h2>2a. Class Component Counter</h2>
        <p className="count">{this.state.count}</p>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <button onClick={this.reset}>Reset</button>
      </section>
    );
  }
}

export default ClassCounter;
