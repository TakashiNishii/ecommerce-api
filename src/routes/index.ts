import express from "express";
import { userRoutes } from "./users.route";

export const routes = (app: express.Express) => {
  // Registra o middleware para o express reconhecer o corpo da requisição em formato JSON
app.use(express.json());

// Registra as rotas da aplicação
  app.use(userRoutes)
}