import { useState } from "react";

const fruits = [
  { id: 1, name: "Apple", price: 120 },
  { id: 2, name: "Banana", price: 50 },
  { id: 3, name: "Mango", price: 150 },
  { id: 4, name: "Orange", price: 80 },
];

// 3e. Iterative rendering with map() and stable keys (use ids, not array index)
function FruitList() {
  const [maxPrice, setMaxPrice] = useState(200);
  const visible = fruits.filter((f) => f.price <= maxPrice);

  return (
    <section className="card">
      <h2>3e. Rendering Lists with map()</h2>
      <label>
        Max price (Rs): {maxPrice}
        <input type="range" min="50" max="200" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
      </label>
      <ul className="list">
        {visible.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name} - Rs {fruit.price}
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p>No fruits match this price.</p>}
    </section>
  );
}

export default FruitList;
