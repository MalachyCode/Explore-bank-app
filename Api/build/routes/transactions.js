"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const transactionsRouter = require('express').Router();
const transaction_1 = __importDefault(require("../models/transaction"));
transactionsRouter.get('/', (_req, res) => {
    transaction_1.default.find({}).then((transactions) => {
        res.json(transactions);
    });
});
transactionsRouter.get('/:id', (req, res, next) => {
    transaction_1.default.findById(req.params.id)
        .then((transaction) => {
        if (transaction) {
            res.json(transaction);
        }
        else {
            res.status(404).end();
        }
    })
        .catch((error) => next(error));
});
transactionsRouter.post('/', (req, res, next) => {
    const body = req.body;
    const transaction = new transaction_1.default({
        createdOn: body.createdOn,
        type: body.type,
        accountNumber: body.accountNumber,
        cashier: body.cashier,
        amount: body.amount,
        oldBalance: body.oldBalance,
        newBalance: body.newBalance,
        description: body.description,
    });
    transaction
        .save()
        .then((savedTransaction) => {
        res.json(savedTransaction);
    })
        .catch((error) => next(error));
});
transactionsRouter.delete('/:id', (req, res, next) => {
    transaction_1.default.findByIdAndDelete(req.params.id)
        .then(() => {
        res.status(204).end();
    })
        .catch((error) => next(error));
});
transactionsRouter.put('/:id', (req, res, next) => {
    const body = req.body;
    const transaction = {
        createdOn: body.createdOn,
        type: body.type,
        accountNumber: body.accountNumber,
        cashier: body.cashier,
        amount: body.amount,
        oldBalance: body.oldBalance,
        newBalance: body.newBalance,
        description: body.description,
    };
    transaction_1.default.findByIdAndUpdate(req.params.id, transaction, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedTransaction) => {
        res.json(updatedTransaction);
    })
        .catch((error) => next(error));
});
// module.exports = usersRouter
exports.default = transactionsRouter;
