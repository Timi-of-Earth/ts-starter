import app from './app';
import env from './env.config';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const application = app.getApp();

const PORT = env.PORT || 4000;

const server = application.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

process.on('unhandledRejection', (reason: any, promise) => {
  console.log(`Unhandled rejection at ${promise}, reason: ${reason.message}`);
  server.close(() => {
    console.log('closed running process');
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
