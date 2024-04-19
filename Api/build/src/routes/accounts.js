"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const accountsRouter = require('express').Router();
const account_1 = __importDefault(require("../models/account"));
accountsRouter.get('/', (_req, res) => {
    account_1.default.find({}).then((accounts) => {
        res.json(accounts);
    });
});
accountsRouter.get('/:id', (req, res, next) => {
    account_1.default.findById(req.params.id)
        .then((account) => {
        if (account) {
            res.json(account);
        }
        else {
            res.status(404).end();
        }
    })
        .catch((error) => next(error));
});
accountsRouter.post('/', (req, res, next) => {
    const body = req.body;
    const account = new account_1.default({
        balance: body.balance,
        createdOn: body.createdOn,
        owner: body.owner,
        status: body.status,
        accountNumber: body.accountNumber,
        type: body.type,
    });
    account
        .save()
        .then((savedAccount) => {
        res.json(savedAccount);
    })
        .catch((error) => next(error));
});
accountsRouter.delete('/:id', (req, res, next) => {
    account_1.default.findByIdAndDelete(req.params.id)
        .then(() => {
        res.status(204).end();
    })
        .catch((error) => next(error));
});
accountsRouter.put('/:id', (req, res, next) => {
    const body = req.body;
    const account = {
        balance: body.balance,
        createdOn: body.createdOn,
        owner: body.owner,
        status: body.status,
        accountNumber: body.accountNumber,
        type: body.type,
    };
    account_1.default.findByIdAndUpdate(req.params.id, account, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedAccount) => {
        res.json(updatedAccount);
    })
        .catch((error) => next(error));
});
// module.exports = usersRouter
exports.default = accountsRouter;
