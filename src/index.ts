import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World - tsx-watch");
});

app.get("/users", (req: Request, res: Response) => {
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

  res.send(usuarios);
})

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000")
})