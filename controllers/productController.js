const fs = require('fs');
const path = './data/products.json';

function loadData() {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

function saveData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

exports.getProducts = (req, res) => {
  const products = loadData();
  res.json(products);
};

exports.createProduct = (req, res) => {
  const products = loadData();
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.push(newProduct);
  saveData(products);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const products = loadData();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { id: req.params.id, ...req.body };
  saveData(products);
  res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
  let products = loadData();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  saveData(products);
  res.status(204).send();
};
