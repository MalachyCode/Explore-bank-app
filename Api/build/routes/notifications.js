"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notificationsRouter = require('express').Router();
const notification_1 = __importDefault(require("../models/notification"));
notificationsRouter.get('/', (_req, res) => {
    notification_1.default.find({}).then((notifications) => {
        res.json(notifications);
    });
});
notificationsRouter.get('/:id', (req, res, next) => {
    notification_1.default.findById(req.params.id)
        .then((notification) => {
        if (notification) {
            res.json(notification);
        }
        else {
            res.status(404).end();
        }
    })
        .catch((error) => next(error));
});
notificationsRouter.post('/', (req, res, next) => {
    const body = req.body;
    const notification = new notification_1.default({
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
});
notificationsRouter.delete('/:id', (req, res, next) => {
    notification_1.default.findByIdAndDelete(req.params.id)
        .then(() => {
        res.status(204).end();
    })
        .catch((error) => next(error));
});
notificationsRouter.put('/:id', (req, res, next) => {
    const body = req.body;
    const notification = {
        owner: body.owner,
        oldNotifications: body.oldNotifications,
        newNotifications: body.newNotifications,
    };
    notification_1.default.findByIdAndUpdate(req.params.id, notification, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedNotification) => {
        res.json(updatedNotification);
    })
        .catch((error) => next(error));
});
// module.exports = usersRouter
exports.default = notificationsRouter;
