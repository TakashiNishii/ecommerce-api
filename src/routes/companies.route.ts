import { Router } from "express";
import { CompaniesController } from "../controllers/companies.controller";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newCompanySchema, updateCompanySchema } from "../models/company.model";

export const companiesRoutes = Router();

companiesRoutes.get("/companies", asyncHandler(CompaniesController.getAll));
companiesRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companiesRoutes.post("/companies", celebrate({ [Segments.BODY]: newCompanySchema }), asyncHandler(CompaniesController.save));
companiesRoutes.put("/companies/:id", celebrate({ [Segments.BODY]: updateCompanySchema }), asyncHandler(CompaniesController.update));