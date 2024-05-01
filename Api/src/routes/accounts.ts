// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const accountsRouter = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import Account from '../models/account';
// import User from '../models/user'

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

accountsRouter.post(
  '/find-account',
  async (req: Request, res: Response, _next: NextFunction) => {
    // const user = await User.findOne({ email });
    const { accountNumber } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        error: 'Account not found',
      });
    }

    res.status(200).json(account);
  }
);

const getTokenFrom = (request: Request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

accountsRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' });
    }
    // const user = await User.findById(decodedToken.id)

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
  }
);

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
