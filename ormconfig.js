require('dotenv').config();
const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_SCHEMA,
} = process.env;

if (
  !DB_DRIVER ||
  !DB_HOST ||
  !DB_PORT ||
  !DB_USERNAME ||
  !DB_PASSWORD ||
  !DB_NAME
) {
  throw new Error('Env vars DB_*** are required');
}

module.exports = {
  type: 'pg',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.js'],
  schema: DB_SCHEMA || undefined,
  cli: {
    migrationsDir: 'src/migrations',
  },
};