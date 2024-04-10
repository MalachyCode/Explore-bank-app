const express = require('express');
const app = express();

app.use(express.json());

let users = [
  {
    id: 1,
    email: 'julie@yahoo.com',
    firstName: 'Juliet',
    lastName: 'Oma',
    middleName: '',
    password: 'Juliet22@',
    type: 'client',
    isAdmin: false,
    number: '08100000000',
    dob: '1996-03-22',
    transferPin: '7785',
  },
  {
    id: 2,
    email: 'ahmedali012@gmail.com',
    firstName: 'Ahmed',
    lastName: 'Ali',
    middleName: '',
    password: 'Ahmed22@',
    type: 'client',
    isAdmin: false,
    number: '09022222222',
    dob: '2000-10-25',
    transferPin: '',
  },
  {
    id: 3,
    email: 'martinsF@gmail.com',
    firstName: 'Martins',
    lastName: 'Fowler',
    middleName: '',
    password: 'Martins22@',
    type: 'staff',
    isAdmin: false,
    number: '09047863821',
    dob: '1998-06-11',
  },
  {
    id: 4,
    email: 'malachyN3@gmail.com',
    firstName: 'Malachy',
    lastName: 'Nwafor',
    middleName: '',
    password: 'Malachy22@',
    type: 'staff',
    isAdmin: true,
    number: '09046788945',
    dob: '2001-06-19',
  },
];

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/users', (_req, res) => {
  res.json(users);
});

const generateId = () => {
  const maxId = users.length > 0 ? Math.max(...users.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/users', (req, res) => {
  const body = req.body;

  if (!body.firstName) {
    return res.status(400).json({
      error: 'First Name missing',
    });
  }

  const user = {
    ...body,
    id: generateId(),
  };

  users.concat(user);

  res.json(user);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
