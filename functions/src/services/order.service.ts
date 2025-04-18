import { NotFoundError } from "../errors/not-found.error.js";
import { OrderItem } from "../models/order-item.model.js";
import { Order, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class OrderService {
  private orderRepository: OrderRepository;
  private companyRepository: CompanyRepository;
  private paymentMethodRepository: PaymentMethodRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.companyRepository = new CompanyRepository();
    this.paymentMethodRepository = new PaymentMethodRepository();
    this.productRepository = new ProductRepository();
  }

  async save(order: Order) {
    const empresa = await this.companyRepository.getById(order.empresa.id!);
    if(!empresa) {
      throw new NotFoundError("Empresa não encontrada!");
    }
    order.empresa = empresa;

    const formaPagamento = await this.paymentMethodRepository.getById(order.formaPagamento.id);
    if(!formaPagamento) {
      throw new NotFoundError("Forma de pagamento não encontrada!");
    }
    order.formaPagamento = formaPagamento;

    for(const item of order.items!) {
      const product = await this.productRepository.getById(item.produto.id);
      if(!product) {
        throw new NotFoundError("Produto não encontrado!");
      }
      item.produto = product;
    }

    await this.orderRepository.save(order);
  }

  async search(query: QueryParamsOrder): Promise<Order[]> {
    return this.orderRepository.search(query)
  }

  async getItems(pedidoId: string): Promise<OrderItem[]>{
    return this.orderRepository.getItems(pedidoId);
  }

  async getById(pedidoId: string): Promise<Order> {
    return this.orderRepository.getBydId(pedidoId);
  }

  async changeStatus(pedidoId: string, status: OrderStatus){
    await this.orderRepository.changeStatus(pedidoId, status);
  }
}