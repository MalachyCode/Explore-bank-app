// eslint-disable-next-line @typescript-eslint/no-var-requires
const incomeExpenseRouter = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import IncomeExpenseInfo from '../models/incomeExpense';

incomeExpenseRouter.get('/', (_req: Request, res: Response) => {
  IncomeExpenseInfo.find({}).then((allIncomeExpenseInfo) => {
    res.json(allIncomeExpenseInfo);
  });
});

incomeExpenseRouter.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    IncomeExpenseInfo.findById(req.params.id)
      .then((singleIncomeExpenseInfo) => {
        if (singleIncomeExpenseInfo) {
          res.json(singleIncomeExpenseInfo);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  }
);

incomeExpenseRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const newIncomeExpenseInfo = new IncomeExpenseInfo({
      owner: body.owner,
      barData: body.barData,
    });

    newIncomeExpenseInfo
      .save()
      .then((savedIncomeExpenseInfo) => {
        res.json(savedIncomeExpenseInfo);
      })
      .catch((error) => next(error));
  }
);

incomeExpenseRouter.post(
  '/user-bar-chart-info',
  async (req: Request, res: Response, _next: NextFunction) => {
    // const user = await User.findOne({ email });
    const { owner } = req.body;

    IncomeExpenseInfo.find({}).then((allBarChartInfo) => {
      const userBarChartInfo = allBarChartInfo.find(
        (barChartInfo) => barChartInfo.owner === owner
      );
      res.json(userBarChartInfo);
    });
  }
);

incomeExpenseRouter.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    IncomeExpenseInfo.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  }
);

incomeExpenseRouter.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const updateIncomeExpenseInfo = {
      owner: body.owner,
      barData: body.barData,
    };

    IncomeExpenseInfo.findByIdAndUpdate(
      req.params.id,
      updateIncomeExpenseInfo,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    )
      .then((updatedIncomeExpenseInfo) => {
        res.json(updatedIncomeExpenseInfo);
      })
      .catch((error) => next(error));
  }
);

export default incomeExpenseRouter;
