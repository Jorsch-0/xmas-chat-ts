import express from 'express';
import { env } from './config';

(async () => {
  const app = express();

  await import('./loaders').then((loader) => loader.default({ app }));

  const serverInstance = app
    .listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });

  process.on('unhandledRejection', (err) => {
    if (err instanceof Error) {
      console.error(err);
    } else {
      console.error('An unhandled rejection occurred, but the reason was not an Error object');
    }

    serverInstance.close(() => {
      console.error('Server is closed due to an unhandled rejection');
      process.exit(1);
    });

    setTimeout(() => {
      console.error('Forcefully exiting the process after 5 seconds of grace period due to an unhandled rejection');
      process.exit(1);
    }, 5000);
  });
})();
