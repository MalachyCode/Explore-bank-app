// eslint-disable-next-line @typescript-eslint/no-var-requires
const usersRouter = require('express').Router()
import { NextFunction, Request, Response } from 'express'
import User from '../models/user'

usersRouter.get('/', (_req: Request, res: Response) => {
  User.find({}).then((users) => {
    res.json(users)
  })
})

usersRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

usersRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

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
  })

  user
    .save()
    .then((savedUser) => {
      res.json(savedUser)
    })
    .catch((error) => next(error))
})

usersRouter.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end()
      })
      .catch((error) => next(error))
  }
)

usersRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

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
  }

  User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedUser) => {
      res.json(updatedUser)
    })
    .catch((error) => next(error))
})

// module.exports = usersRouter
export default usersRouter
