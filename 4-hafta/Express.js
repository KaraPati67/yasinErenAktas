const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
app.use(express.json());

// Sequelize bağlantısı (mevcut bir SQLite dosyasına bağlanır)
const path = require('path');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

// User modeli
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

// Veritabanını senkronize et
sequelize.sync();

// CRUD işlemleri
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.send('User deleted');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});