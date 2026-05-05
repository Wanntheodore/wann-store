const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];
let orders = [];

// ================= PRODUK =================
app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price
  };

  products.push(newProduct);
  res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  products = products.map(p =>
    p.id === id ? { ...p, name, price } : p
  );

  res.json({ success: true });
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

// ================= ORDER =================
app.post("/order", (req, res) => {
  const { email, product, price } = req.body;

  const order_id = "INV" + Date.now();

  orders.push({
    order_id,
    email,
    product,
    price,
    status: "pending"
  });

  res.json({
    order_id,
    pay_url: "https://pakasir.com/pay/" + order_id
  });
});

// ================= EMAIL =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "EMAILKAMU@gmail.com",
    pass: "APP_PASSWORD"
  }
});

async function kirimEmail(to, produk) {
  await transporter.sendMail({
    from: '"Digital Store"',
    to: to,
    subject: "Pesanan Berhasil",
    html: `<h3>Produk:</h3><b>${produk}</b>`
  });
}

// ================= WEBHOOK =================
app.post("/webhook/pakasir", async (req, res) => {
  const data = req.body;

  if (data.status === "PAID") {
    const order = orders.find(o => o.order_id === data.order_id);

    if (order) {
      order.status = "success";
      await kirimEmail(order.email, order.product);
    }
  }

  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});