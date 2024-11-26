import fs from "fs";
import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

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

export async function updateNewPost(request, response) {
  const id = request.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await gerarDescricaoComGemini(imageBuffer);

    const post = {
      imgUrl: urlImg,
      descricao: description,
      alt: request.body.alt
    };

    const postCreated = await updatePost(id, post);
    response.status(200).json(postCreated);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({"Erro" : "Falha na requisição."});
  }
}