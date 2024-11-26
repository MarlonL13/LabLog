import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

console.log(process.env.DB_NAME); // This will print out all environment variables loaded from the .env file