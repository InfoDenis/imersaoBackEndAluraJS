import { getTodosPosts } from "../models/postsModel.js";

export async function listarPosts (request, response) {
  const posts = await getTodosPosts();
  response.status(200).json(posts);
};