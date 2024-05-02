import { env } from './config';
import { app, server } from './socket/socket';

(async () => {
  await import('./loaders').then((loader) => loader.default({ app }));

  server
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

    server.close(() => {
      console.error('Server is closed due to an unhandled rejection');
      process.exit(1);
    });

    setTimeout(() => {
      console.error('Forcefully exiting the process after 5 seconds of grace period due to an unhandled rejection');
      process.exit(1);
    }, 5000);
  });
})();
