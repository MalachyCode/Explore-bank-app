require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user');

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/users', (_req, res) => {
  User.find({}).then((users) => {
    console.log(users);
    res.json(users);
  });
});

// const generateId = () => {
//   const maxId = users.length > 0 ? Math.max(...users.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post('/api/users', (req, res) => {
  const body = req.body;

  if (!body.firstName) {
    return res.status(400).json({
      error: 'First Name missing',
    });
  }

  const user = new User({
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    middleName: body.middleName || '',
    password: body.password,
    type: body.type,
    isAdmin: body.isAdmin,
    number: body.number,
    dob: body.dob,
    transferPin: '',
  });

  user.save().then((savedUser) => {
    res.json(savedUser);
  });
});

// app.get('/api/users/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).end();
//   }
// });

// app.delete('/api/users/:id', (req, res) => {
//   const id = req.params.id;
//   users = users.filter((user) => user.id !== id);

//   res.status(204).end();
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
