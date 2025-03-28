import { Request, Response } from "express";
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        res.send(await new CategoryService().getAll());
    }

    static async getById(req: Request, res: Response) {
        let categoryId = req.params.id;
        res.send(await new CategoryService().getById(categoryId));
    }

    static async save(req: Request, res: Response) {
        await new CategoryService().save(req.body);
        res.status(201).send({
            message: `Categoria criada com sucesso!`
        });
    }

    static async update(req: Request, res: Response) {
        let categoryId = req.params.id;
        let category = req.body as Category;
        await new CategoryService().update(categoryId, category);
        res.send({
            message: "Categoria alterada com sucesso!"
        });
    }

    static async delete(req: Request, res: Response) {
        const categoryId = req.params.id;
        await new CategoryService().delete(categoryId);
        res.status(204).end();
    }

}