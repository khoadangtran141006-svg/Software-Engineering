import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  cartKey: string;
  id: number;
  name: string;
  category: string;
  image: string;
  size: string;
  toppings: string[];
  note: string;
  unitPrice: number;
  quantity: number;
};

type AddCartItem = Omit<CartItem, "cartKey">;

type CartStore = {
  items: CartItem[];

  addItem: (item: AddCartItem) => void;
  increaseQuantity: (cartKey: string) => void;
  decreaseQuantity: (cartKey: string) => void;
  removeItem: (cartKey: string) => void;
  clearCart: () => void;

  getTotalQuantity: () => number;
  getSubtotal: () => number;
};

function createCartKey(item: AddCartItem) {
  return [
    item.id,
    item.size,
    [...item.toppings].sort().join(","),
    item.note.trim(),
  ].join("|");
}

export const useCartStore = create<CartStore>()(persist((set, get) => ({
  items: [],

  addItem: (item) => {
    const cartKey = createCartKey(item);

    set((state) => {
      const existingItem = state.items.find(
        (currentItem) => currentItem.cartKey === cartKey,
      );

      if (existingItem) {
        return {
          items: state.items.map((currentItem) =>
            currentItem.cartKey === cartKey
              ? {
                  ...currentItem,
                  quantity:
                    currentItem.quantity + item.quantity,
                }
              : currentItem,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            ...item,
            cartKey,
          },
        ],
      };
    });
  },

  increaseQuantity: (cartKey) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    }));
  },

  decreaseQuantity: (cartKey) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  removeItem: (cartKey) => {
    set((state) => ({
      items: state.items.filter(
        (item) => item.cartKey !== cartKey,
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalQuantity: () => {
    return get().items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) =>
        total + item.unitPrice * item.quantity,
      0,
    );
  },
}), { name: "brewLite-cart" }));
