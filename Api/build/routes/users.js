"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const usersRouter = require('express').Router();
const user_1 = __importDefault(require("../models/user"));
usersRouter.get('/', (_req, res) => {
    user_1.default.find({}).then((users) => {
        res.json(users);
    });
});
usersRouter.get('/:id', (req, res, next) => {
    user_1.default.findById(req.params.id)
        .then((user) => {
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).end();
        }
    })
        .catch((error) => next(error));
});
usersRouter.post('/', (req, res, next) => {
    const body = req.body;
    const user = new user_1.default({
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
usersRouter.delete('/:id', (req, res, next) => {
    user_1.default.findByIdAndDelete(req.params.id)
        .then(() => {
        res.status(204).end();
    })
        .catch((error) => next(error));
});
usersRouter.put('/:id', (req, res, next) => {
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
    user_1.default.findByIdAndUpdate(req.params.id, user, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedUser) => {
        res.json(updatedUser);
    })
        .catch((error) => next(error));
});
// module.exports = usersRouter
exports.default = usersRouter;
