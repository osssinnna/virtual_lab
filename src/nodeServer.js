const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/virtual_lab', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Определение схемы и модели данных с использованием mongoose
const YourSchema = new mongoose.Schema({
    name: String,
    value: String
});

const YourModel = mongoose.model('YourModel', YourSchema);

// Роуты для получения и добавления данных
app.get('/data', async (req, res) => {
  try {
    const data = await YourModel.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/data', async (req, res) => {
  const { name, value } = req.body;
  try {
    const newData = new YourModel({ name, value });
    await newData.save();
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
