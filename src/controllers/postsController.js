import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModel.js";

export async function listarPosts (request, response) {
  const posts = await getTodosPosts();
  response.status(200).json(posts);
};

export async function postarNovoPost(request, response) {
  const novoPost = request.body;

  try {
    const postCriado = await criarPost(novoPost);
    response.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({"Erro" : "Falha na requisição."});
  }
}

export async function uploadImagem(request, response) {
  const novoPost = {
    descricao: "",
    imgUrl: request.file.originalname,
    alt: ""
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(request.file.path, imagemAtualizada);
    response.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({"Erro" : "Falha na requisição."});
  }
}
