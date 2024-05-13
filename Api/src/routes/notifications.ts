// eslint-disable-next-line @typescript-eslint/no-var-requires
const notificationsRouter = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import Notification from '../models/notification';

notificationsRouter.get('/', (_req: Request, res: Response) => {
  Notification.find({}).then((notifications) => {
    res.json(notifications);
  });
});

notificationsRouter.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Notification.findById(req.params.id)
      .then((notification) => {
        if (notification) {
          res.json(notification);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  }
);

notificationsRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const notification = new Notification({
      owner: body.owner,
      oldNotifications: body.oldNotifications,
      newNotifications: body.newNotifications,
    });

    notification
      .save()
      .then((savedNotification) => {
        res.json(savedNotification);
      })
      .catch((error) => next(error));
  }
);

notificationsRouter.post(
  '/user-notification-box',
  async (req: Request, res: Response, _next: NextFunction) => {
    // const user = await User.findOne({ email });
    const { owner } = req.body;

    const notificationBox = await Notification.findOne({ owner });

    if (!notificationBox) {
      return res.status(404).json({
        error: 'User notification box not found',
      });
    }

    res.status(200).json(notificationBox);
  }
);

notificationsRouter.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Notification.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  }
);

notificationsRouter.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const notification = {
      owner: body.owner,
      oldNotifications: body.oldNotifications,
      newNotifications: body.newNotifications,
    };

    Notification.findByIdAndUpdate(req.params.id, notification, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedNotification) => {
        res.json(updatedNotification);
      })
      .catch((error) => next(error));
  }
);

// module.exports = usersRouter
export default notificationsRouter;
