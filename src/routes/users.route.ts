import express, { Request, Response } from "express";

export const userRoutes = express.Router()

type User = {
  id: number; 
  nome: string; 
  email: string;
}

let id = 0;
let usuarios: User[] = [];

userRoutes.get("/users", (req: Request, res: Response) => {
  res.send(usuarios);
})

userRoutes.get("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let user = usuarios.find(user => user.id === userId);
  res.send(user);
})

userRoutes.put("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let user = usuarios.find(user => user.id === userId);

  if(user){
    user.email = req.body.email;
    user.nome = req.body.nome;
    
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

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let userList = usuarios.filter(user => user.id !== userId);
  usuarios = userList;

  res.send({
    message: "Usuário deletado com sucesso",
  })
})

userRoutes.post("/users", (req: Request, res: Response) => {
  let user = req.body;
  user.id = ++id;
  usuarios.push(user);
  res.send({
    message: "Usuário cadastrado com sucesso",
  })
})