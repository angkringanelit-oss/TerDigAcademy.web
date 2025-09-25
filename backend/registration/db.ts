import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const registrationDB = new SQLDatabase("registration", {
  migrations: "./migrations",
});
