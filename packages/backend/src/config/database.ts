/* eslint-disable no-console */

import { createConnection, DataSourceOptions } from 'typeorm';

function getSSLConfig(env: string | undefined) {
  if (env === undefined) return;
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false }
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

const connectDB = async () => {
  try {
    const options: DataSourceOptions = {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT_DB),
      logging: ['query', 'error'],
      type: 'postgres',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/**/*.{ts,js}'],
      subscribers: ['src/subscriber/**/*.ts'],
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: getSSLConfig(process.env.SERVER_MODE),
      synchronize: true
    };
    await createConnection(options);
    console.log('PostgreSQL Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
