//Model cuidará dos nossos dados
import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectToBank from "../config/dbConfig.js";

const connection = await connectToBank(process.env.STRING_CONNECTION);

export async function getAllPosts() {
  const db = connection.db("imersao-instabytes");
  const collection = db.collection("posts");
  return collection.find().toArray();
}

export async function createPost(newPost) {
  const db = connection.db("imersao-instabytes");
  const collection = db.collection("posts");
  return collection.insertOne(newPost);
}

export async function updatePost(id, newPost) {
  const db = connection.db("imersao-instabytes");
  const collection = db.collection("posts");
  const objId = ObjectId.createFromHexString(id);
  return collection.updateOne({_id: new ObjectId(objId)}, {$set:newPost});
}