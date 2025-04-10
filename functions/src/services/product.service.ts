import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { isStorageUrlValid } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class ProductService {

    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.uploadFileService = new UploadFileService("images/products/")
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.getAll();
    }

    async search(categoriaId: string): Promise<Product[]> {
        return this.productRepository.search(categoriaId);
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError("Produto não encontrado!");
        }
        return product;
    }

    async save(product: Product) {
        const categoria = await this.getCategoryById(product.categoria.id);
        product.categoria = categoria;
        if(product.imagem) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }
        await this.productRepository.save(product);
    }

    async update(id: string, product: Product) {
        const _product = await this.getById(id);
        const categoria = await this.getCategoryById(product.categoria.id)

        if(product.imagem && !isStorageUrlValid(product.imagem)){
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }

        _product.nome = product.nome;
        _product.descricao= product.descricao;
        _product.imagem = product.imagem;
        _product.preco = product.preco;
        _product.categoria = categoria;
        _product.ativa = product.ativa;

        await this.productRepository.update(_product);
    }

    async delete(id: string) {
        await this.productRepository.delete(id);
    }


    private async getCategoryById(id: string) {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new NotFoundError("Categoria não encontrada!");
        }
        return category;
    }
}