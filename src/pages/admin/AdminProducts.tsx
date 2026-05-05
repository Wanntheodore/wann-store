import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (editId) {
      await fetch(`http://localhost:3000/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({ name: "", price: "" });
    setEditId(null);
    load();
  };

  const del = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    });
    load();
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Manajemen Produk</h2>

      {/* FORM */}
      <input
        placeholder="Nama Produk"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Harga"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={submit}>
        {editId ? "Update" : "Tambah"}
      </button>

      <hr />

      {/* SEARCH */}
      <input
        placeholder="Cari Produk Sekarang"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      {filtered.map(p => (
        <div key={p.id}>
          {p.name} - Rp{p.price}

          <button onClick={() => {
            setForm({ name: p.name, price: p.price });
            setEditId(p.id);
          }}>
            Edit
          </button>

          <button onClick={() => del(p.id)}>
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}