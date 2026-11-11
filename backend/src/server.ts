import { app } from './app';
import { config } from './config';
import { checkDatabaseConnection } from './database/prisma';

async function startServer() {
  const isDbConnected = await checkDatabaseConnection();
  console.log(`[Database] PostgreSQL connection: ${isDbConnected ? 'CONNECTED' : 'STANDALONE_FALLBACK'}`);

  const server = app.listen(config.port, () => {
    console.log(`=================================================`);
    console.log(`🚀 TRIPORA AI REST API Server running on port ${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Health Check: http://localhost:${config.port}/health`);
    console.log(`📖 Base API: http://localhost:${config.port}/api/v1`);
    console.log(`=================================================`);
  });

  const gracefulShutdown = () => {
    console.log('\nReceived shutdown signal, closing server gracefully...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

startServer().catch((err) => {
  console.error('Fatal error during server startup:', err);
  process.exit(1);
});
