import express, { Request, Response } from "express";

const app = express();

// Registra o middleware para o express reconhecer o corpo da requisição em formato JSON
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World - tsx-watch");
});

let id = 0;
let usuarios: {id: number, nome: string, email: string}[] = [];

app.get("/users", (req: Request, res: Response) => {
  res.send(usuarios);
})

app.get("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let user = usuarios.find(user => user.id === userId);
  res.send(user);
})

app.put("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let user = usuarios.find(user => user.id === userId);

  if(user){
    user = req.body
    res.send({
      message: "Usuário atualizado com sucesso",
    })
  } 
  if(!user) {
    res.send({
      message: "Usuário não encontrado",
    })
  }
})

app.delete("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let userList = usuarios.filter(user => user.id !== userId);
  usuarios = userList;

  res.send({
    message: "Usuário deletado com sucesso",
  })
})

app.post("/users", (req: Request, res: Response) => {
  let user = req.body;
  user.id = ++id;
  usuarios.push(user);
  res.send({
    message: "Usuário cadastrado com sucesso",
  })
})

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000")
})