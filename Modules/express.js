const express = require("express");
const UserModel = require("../src/models/user.model");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "src/views");
//Mindlewares
//Esta mindlewares será executada antes da requisicão, e o next serve para que a requisicão chamada seje realizada
app.use((req, res, next) => {
  // console.log(req.body);

  console.log(`Request Type: ${req.method}`); //Logando se é Post, Patch, Delete, Getch entre outras
  console.log(`Content Type: ${req.headers["content-type"]}`); //Logando o tipo application/json ou text/html entre outros
  console.log(`Date: ${new Date()}`); //Logando a data

  next(); // next serve para que o express continue
});

app.get("/views/users", async (req, res) => {
  const users = await UserModel.find({});

  res.render("index", { users });
});

//Retorno do Objeto Json inteiro

app.get("/users", async (req, res) => {
  //Realizando Busca de usuário
  try {
    // const users = await UserModel.find(name:wellynton); // Aonde eu posso realizar buscas no banco
    const users = await UserModel.find({}); // aqui como o find esta vazio ele retorna o objeto todo.

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message); //usado o send pq não quero enviar como Json e sim como String
  }
});

//Pesquisa usuério

app.get("/users/:id", async (req, res) => {
  // Busca de users pelo ID
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Cria usuário

app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Alteração de usuário

app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id; //Armazenando o id
    //Linha de alteração dos atributos do usuário
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true }); //Esse new serve para que a alteração seja feita de forma global
    //Linha de resposta da alteração if(ok)
    res.status(200).json(user);
  } catch (error) {
    //Linha de resposta da alteração if(erro)
    res.status(500).send(error.message);
  }
});

//Remove usuário

app.delete("/users/:id", async (req, res) => {
  //Deletando usuário
  try {
    const id = req.params.id;

    const user = await UserModel.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
