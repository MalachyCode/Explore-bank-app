require('dotenv').config();
import express, { ErrorRequestHandler } from 'express';
const app = express();
import cors from 'cors';
import User from './models/user';

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

app.post('/api/users', (req, res, next) => {
  const body = req.body;

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
    transferPin: body.transferPin || '',
  });

  user
    .save()
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((error) => next(error));
});

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        console.log(typeof user.id);
        res.json(user);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put('/api/users/:id', (req, res, next) => {
  const body = req.body;

  const user = {
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    middleName: body.middleName,
    password: body.password,
    type: body.type,
    isAdmin: body.isAdmin,
    number: body.number,
    dob: body.dob,
    transferPin: body.transferPin,
  };

  User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => next(error));
});

app.delete('/api/users/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((_result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler); // ok

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
