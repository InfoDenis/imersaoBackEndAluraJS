import fs from "fs";
import { getAllPosts, createPost } from "../models/postsModel.js";

export async function listPosts (request, response) {
  const posts = await getAllPosts();
  response.status(200).json(posts);
};

export async function postNewPost(request, response) {
  const newPost = request.body;

  try {
    const postCreated = await createPost(newPost);
    response.status(200).json(postCreated);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({"Erro" : "Falha na requisição."});
  }
}

export async function uploadImage(request, response) {
  const newPost = {
    descricao : "",
    imgUrl : request.file.originalname,
    alt : ""
  };

  try {
    const postCreated = await createPost(newPost);
    const updatedImage = `uploads/${postCreated.insertedId}.png`;
    fs.renameSync(request.file.path, updatedImage);
    response.status(200).json(postCreated);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({"Erro" : "Falha na requisição."});
  }
}