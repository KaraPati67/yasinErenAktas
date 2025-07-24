
import React, { useState } from "react";


// Birden fazla sayaç ekleyip kaldırabileceğiniz, React'ın component ve state mantığına özgü bir örnek
function Counter({ id, onRemove }) {
  const [count, setCount] = useState(0);
  return (
    <div style={{border: '1px solid #ccc', padding: 12, marginBottom: 8}}>
      <h3>Sayaç #{id}</h3>
      <p>Değer: {count}</p>
      <button onClick={() => setCount(count + 1)}>Arttır</button>
      <button onClick={() => setCount(count - 1)} style={{marginLeft: '8px'}}>Azalt</button>
      <button onClick={() => setCount(0)} style={{marginLeft: '8px'}}>Sıfırla</button>
      <button onClick={onRemove} style={{marginLeft: '8px', color: 'red'}}>Kaldır</button>
    </div>
  );
}

function App() {
  const [counters, setCounters] = useState([1]);
  const [nextId, setNextId] = useState(2);

  const addCounter = () => {
    setCounters([...counters, nextId]);
    setNextId(nextId + 1);
  };

  const removeCounter = (id) => {
    setCounters(counters.filter(c => c !== id));
  };

  return (
    <div>
      <h1>React ile Dinamik Sayaçlar</h1>
      <button onClick={addCounter}>Yeni Sayaç Ekle</button>
      <div style={{marginTop: 24}}>
        {counters.map(id => (
          <Counter key={id} id={id} onRemove={() => removeCounter(id)} />
        ))}
      </div>
    </div>
  );
}

export default App;