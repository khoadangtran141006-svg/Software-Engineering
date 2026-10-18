"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED"
  | "PAYMENT_FAILED";

export type OrderItem = {
  id: number;
  name: string;
  image: string;
  category: string;
  size: string;
  toppings: string[];
  note: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  /** Id trong cơ sở dữ liệu (dùng để gọi API hủy đơn); đơn vừa tạo cục bộ có thể chưa có. */
  dbId?: number;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: "QR Code" | "Ví điện tử" | "Thẻ ngân hàng";
  items: OrderItem[];
  totalQuantity: number;
  total: number;
};

type OrdersStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
  setOrders: (orders: Order[]) => void;
};

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      /*
       * Không seed dữ liệu mẫu.
       * Khi mới chạy ứng dụng, Orders sẽ trống.
       */
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      clearOrders: () => {
        set({ orders: [] });
      },

      setOrders: (orders) => set({ orders }),
    }),
    {
      name: "brewLite-orders",
    },
  ),
);
