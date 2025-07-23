import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

const client = new MongoClient(process.env.MONGO_URI!, {
  tls: true
});
let isConnected = false;

export async function connectMongo() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db();
}

export default client;