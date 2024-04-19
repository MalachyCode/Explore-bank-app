// eslint-disable-next-line @typescript-eslint/no-var-requires
const accountsRouter = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import Account from '../models/account';

accountsRouter.get('/', (_req: Request, res: Response) => {
  Account.find({}).then((accounts) => {
    res.json(accounts);
  });
});

accountsRouter.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Account.findById(req.params.id)
      .then((account) => {
        if (account) {
          res.json(account);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  }
);

accountsRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const account = new Account({
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

accountsRouter.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Account.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  }
);

accountsRouter.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const account = {
      balance: body.balance,
      createdOn: body.createdOn,
      owner: body.owner,
      status: body.status,
      accountNumber: body.accountNumber,
      type: body.type,
    };

    Account.findByIdAndUpdate(req.params.id, account, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedAccount) => {
        res.json(updatedAccount);
      })
      .catch((error) => next(error));
  }
);

// module.exports = usersRouter
export default accountsRouter;
