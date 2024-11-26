import express from "express";
import multer from "multer";
import cors from "cors";

import { listPosts, postNewPost, uploadImage, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200 
}

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

  app.use(cors(corsOptions));

  app.get("/posts", listPosts);

  app.post("/posts", postNewPost);

  app.post("/upload", upload.single("imagem"), uploadImage);

  app.put("/upload/:id", updateNewPost);

}

export default routes;