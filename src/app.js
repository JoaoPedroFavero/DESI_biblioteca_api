`use strict`;
const express = require(`express`);
const app = express();
app.use(express.json());

const livrosRoutes = require(`./routes/livrosRoutes`);
const autoresRoutes = require(`./routes/autoresRoutes`);
const generosRoutes = require(`./routes/generosRoutes`);
const autoresLivrosRoutes = require(`./routes/autoresLivrosRoutes`);
const livrosGenerosRoutes = require(`./routes/livrosGenerosRoutes`);

app.use(livrosRoutes);
app.use(autoresRoutes);
app.use(generosRoutes);
app.use(autoresLivrosRoutes);
app.use(livrosGenerosRoutes);

module.exports = app;