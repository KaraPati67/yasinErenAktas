
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts([]);
  }, []);

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.body.toLowerCase().includes(search.toLowerCase())
  );

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const addProduct = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setProducts([
      { id: Date.now(), title: newTitle, body: newBody },
      ...products
    ]);
    setNewTitle("");
    setNewBody("");
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditBody(item.body);
  };

  const saveEdit = (id) => {
    setProducts(products.map(item =>
      item.id === id ? { ...item, title: editTitle, body: editBody } : item
    ));
    setEditId(null);
    setEditTitle("");
    setEditBody("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditBody("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      <h2>Ürün Listesi</h2>

      <form onSubmit={addProduct}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Ürün başlığı"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea
            placeholder="Ürün açıklaması"
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
          />
        </div>
        <button type="submit">Ürün Ekle</button>
      </form>
      <input
        type="text"
        placeholder="Başlıkta veya açıklamada ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>
            <div style={{ flex: 1 }}>
              {editId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Ürün başlığı"
                  />
                  <textarea
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    placeholder="Ürün açıklaması"
                  />
                  <button onClick={() => saveEdit(item.id)} style={{ marginRight: 8 }}>Kaydet</button>
                  <button onClick={cancelEdit}>Vazgeç</button>
                </div>
              ) : (
                <div>
                  <strong>{item.title}</strong>
                  <div style={{ color: '#555', margin: '6px 0' }}>{item.body}</div>
                  <button className="düzenle" onClick={() => startEdit(item)} style={{ marginRight: 8 }}>Düzenle</button>
                </div>
              )}
            </div>
            <button onClick={() => deleteProduct(item.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 