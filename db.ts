import { MongoClient,ObjectId } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';
import {MONGO_URI} from './keys.ts';

const mongoClient = new MongoClient();
mongoClient.connectWithUri(MONGO_URI)
console.log('MONGO DB CONNECTED!!!')

const db = mongoClient.database('users')



export {mongoClient , ObjectId};

export default db;