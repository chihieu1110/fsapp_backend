// USER = chihieu
// PASS = "L1oI5zQsirs3Onvw"

import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment"

let DBInstance = null;

// de connect toi MDB

let DBClient = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const CONNECT_DB = async () => {
  await DBClient.connect();
  DBInstance = DBClient.db(env.DATABASE_NAME);
  console.log("Connected to DB");
}

export const CLOSE_DB = async () => {
  console.log("Code chay vao day")
  await DBClient.close();
}
export const GET_DB = () => {
    if (!DBInstance) throw new Error("DB not connected");
    return DBInstance;
}

