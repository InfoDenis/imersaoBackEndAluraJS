import express from "express";

const posts = [
  {
    id        : 1,
    descricao : "Uma foto teste",
    imagem    : "https://placecats.com/millie/300/150"
  },
  {
    id        : 2,
    descricao : "Gato curioso olhando pela janela",
    imagem    : "https://placecats.com/millie/300/150"
  },
  {
    id        : 3,
    descricao : "Gatinho dormindo em uma caixa",
    imagem    : "https://placecats.com/millie/300/150"
  },
  {
    id        : 4,
    descricao : "Gato brincando com um novelo de lã",
    imagem    : "https://placecats.com/millie/300/150"
  },
  {
    id        : 5,
    descricao : "Gato preto em uma noite de lua cheia",
    imagem    : "https://placecats.com/millie/300/150"
  }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escutando.");
});

app.get("/posts", (request, response) => {
  response.status(200).json(posts);
});

function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (request, response) => {
  const index = buscarPostPorId(request.params.id);
  response.status(200).json(posts[index]);
});