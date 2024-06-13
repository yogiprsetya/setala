import '~/config/env';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { db } from './db';

// This will run migrations on the database, skipping the ones already applied
const main = async () => {
  await migrate(db, { migrationsFolder: './drizzle' });
};

// Don't forget to close the connection, otherwise the script will hang
main();
