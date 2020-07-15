import { MongoClient,ObjectId } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

const DENO_API_URI :string= "mongodb+srv://Shahid:Professional7@deno-portfolio.4bf5q.mongodb.net/test";

const mongoClient = new MongoClient();
mongoClient.connectWithUri("mongodb+srv://Shahid:Professional7@deno-portfolio.4bf5q.mongodb.net/test")
console.log('MONGO DB CONNECTED!!!')

const db = mongoClient.database('users')



export {mongoClient , ObjectId};

export default db;