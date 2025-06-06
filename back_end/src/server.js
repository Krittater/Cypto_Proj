const express = require('express');
const indexRoutes = require('./routes/index');
const { sequelize } = require('./models/user');
const config = require('./config');

const app = express();

app.use(express.json());
app.use('/', indexRoutes);

sequelize.sync();

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
