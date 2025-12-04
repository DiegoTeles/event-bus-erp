import { IRepository } from '../../common/interfaces/repository.interface';
import { Order } from '../entities/order.entity';

export interface IOrderRepository extends IRepository<Order> {
  findByBranchId(branchId: string): Promise<Order[]>;
}
