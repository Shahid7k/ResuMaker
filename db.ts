import { MongoClient,ObjectId } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

const NODE_API_URI = "mongodb+srv://Shahid:Professional7@deno-portfolio.4bf5q.mongodb.net/test";

const mongoClient = new MongoClient();
mongoClient.connectWithUri(NODE_API_URI)

const db = mongoClient.database('users')



export {mongoClient , ObjectId};

export default db;