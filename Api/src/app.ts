import config from './utils/config';
import express from 'express';
const app = express();
import cors from 'cors';
import usersRouter from './routes/users';
import accountsRouter from './routes/accounts';
import transactionsRouter from './routes/transactions';
import notificationsRouter from './routes/notifications';
import middleware from './utils/middleware';
import logger from './utils/logger';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

if (config.MONGODB_URI) {
  logger.info('connecting to', config.MONGODB_URI);

  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });
}

app.use(cors());
// app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/notifications', notificationsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// module.exports = app
export default app;
