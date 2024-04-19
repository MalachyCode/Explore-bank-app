import app from './app'; // the actual Express application
import config from './utils/config';
import logger from './utils/logger';

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
