`use strict`;
const express = require(`express`);
const app = express();
app.use(express.json());

const livrosRoutes = require(`./routes/livrosRoutes`);
const autoresRoutes = require(`./routes/autoresRoutes`);

app.use(livrosRoutes);
app.use(autoresRoutes);

module.exports = app;