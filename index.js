const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const absensiRoutes = require('./routes/absensiRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const db = require('./models'); // Mengimpor model dari folder models

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/absensi', absensiRoutes);
app.use('/api/tokens', tokenRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`DB Check completed.`)
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});