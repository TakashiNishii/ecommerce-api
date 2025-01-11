import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World - tsx-watch");
});

let usuarios = [
  {
    nome: "Ygor Takashi",
    idade: 24,
  },
  { 
    nome: "João",
    idade: 30
  }
];

app.get("/users", (req: Request, res: Response) => {
  res.send(usuarios);
})

app.post("/users", (req: Request, res: Response) => {
  let user = req.body;
  usuarios.push(user);
  res.send({
    message: "Usuário cadastrado com sucesso",
  })
})

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000")
})