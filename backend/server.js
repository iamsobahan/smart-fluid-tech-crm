const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const multer = require('multer');
const { userCollection } = require('./mongo'); 
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get('/', cors(), (req, res) => {
  res.send('Hello world');
});

app.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { username, email, password, position } = req.body;
    const photo = req.file;

    if (!username || !email || !password || !position || !photo) {
      return res.status(400).send('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userCollection({
      username,
      email,
      password: hashedPassword,
      position,
      photo: photo.path,
    });

    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
