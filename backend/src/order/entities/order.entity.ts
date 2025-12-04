export type OrderStatus = 'CREATED' | 'SENT_TO_ERP' | 'REJECTED';

export class Order {
  orderId: string;
  branchId: string;
  itemId: string;
  quantity: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    orderId: string,
    branchId: string,
    itemId: string,
    quantity: number,
    status: OrderStatus = 'CREATED',
  ) {
    this.orderId = orderId;
    this.branchId = branchId;
    this.itemId = itemId;
    this.quantity = quantity;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatus(status: OrderStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}
