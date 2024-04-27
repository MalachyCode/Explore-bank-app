// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loginRouter = require('express').Router();
import { Request, Response } from 'express';
import User from '../models/user';

loginRouter.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid email or password',
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    type: user.type,
    isAdmin: user.isAdmin,
    number: user.number,
    dob: user.dob,
    transferPin: user.transferPin,
    profilePicture: user.profilePicture,
  });
});

export default loginRouter;
