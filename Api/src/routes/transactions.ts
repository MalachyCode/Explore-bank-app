// eslint-disable-next-line @typescript-eslint/no-var-requires
const transactionsRouter = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import Transaction from '../models/transaction';

transactionsRouter.get('/', (_req: Request, res: Response) => {
  Transaction.find({}).then((transactions) => {
    res.json(transactions);
  });
});

transactionsRouter.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Transaction.findById(req.params.id)
      .then((transaction) => {
        if (transaction) {
          res.json(transaction);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  }
);

transactionsRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const transaction = new Transaction({
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
  }
);

transactionsRouter.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Transaction.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  }
);

transactionsRouter.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
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

    Transaction.findByIdAndUpdate(req.params.id, transaction, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedTransaction) => {
        res.json(updatedTransaction);
      })
      .catch((error) => next(error));
  }
);

// module.exports = usersRouter
export default transactionsRouter;
