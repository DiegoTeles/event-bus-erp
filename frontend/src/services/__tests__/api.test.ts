import { apiService } from '../api';

const mockPost = jest.fn();
const mockGet = jest.fn();
const mockInterceptors = {
  request: { use: jest.fn() },
  response: { use: jest.fn() },
};

jest.mock('axios', () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();
  const mockInterceptors = {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  };
  
  return {
    create: jest.fn(() => ({
      post: mockPost,
      get: mockGet,
      interceptors: mockInterceptors,
    })),
    __mockPost: mockPost,
    __mockGet: mockGet,
  };
});

const axios = require('axios');
const mockPostFn = axios.__mockPost;
const mockGetFn = axios.__mockGet;

describe('apiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('deve fazer login e retornar token', async () => {
      const mockResponse = { data: { token: 'fake-token', type: 'Bearer' } };
      mockPostFn.mockResolvedValue(mockResponse);

      const result = await apiService.login('testuser');

      expect(mockPostFn).toHaveBeenCalledWith('/auth/login', {
        username: 'testuser',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('createOrder', () => {
    it('deve criar um pedido', async () => {
      const orderData = {
        branchId: 'BRANCH-001',
        itemId: 'ITEM-001',
        quantity: 10,
      };
      const mockResponse = { data: { orderId: 'ORDER-001', ...orderData } };
      mockPostFn.mockResolvedValue(mockResponse);

      const result = await apiService.createOrder(orderData);

      expect(mockPostFn).toHaveBeenCalledWith('/orders', orderData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getOrders', () => {
    it('deve buscar lista de pedidos', async () => {
      const mockResponse = { data: [{ orderId: 'ORDER-001' }] };
      mockGetFn.mockResolvedValue(mockResponse);

      const result = await apiService.getOrders();

      expect(mockGetFn).toHaveBeenCalledWith('/orders', { params: {} });
      expect(result).toEqual(mockResponse.data);
    });

    it('deve buscar pedidos com filtro de branchId', async () => {
      const mockResponse = { data: [{ orderId: 'ORDER-001' }] };
      mockGetFn.mockResolvedValue(mockResponse);

      const result = await apiService.getOrders('BRANCH-001');

      expect(mockGetFn).toHaveBeenCalledWith('/orders', {
        params: { branchId: 'BRANCH-001' },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getOrderById', () => {
    it('deve buscar um pedido por ID', async () => {
      const mockResponse = { data: { orderId: 'ORDER-001' } };
      mockGetFn.mockResolvedValue(mockResponse);

      const result = await apiService.getOrderById('ORDER-001');

      expect(mockGetFn).toHaveBeenCalledWith('/orders/ORDER-001');
      expect(result).toEqual(mockResponse.data);
    });
  });
});

