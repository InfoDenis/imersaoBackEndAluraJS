import express from "express";
import multer from "multer";

import { listPosts, postNewPost, uploadImage } from "../controllers/postsController.js";
//inicio de trecho do multer somente para windows
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
//fim de trecho do multer somente para windows
const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {

  app.use(express.json());

  app.get("/posts", listPosts);

  app.post("/posts", postNewPost);

  app.post("/upload", upload.single("imagem"), uploadImage);

}

export default routes;