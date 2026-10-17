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
  /** Tồn kho của sản phẩm tại thời điểm thêm vào giỏ (dùng chung cho mọi size/topping của sản phẩm). */
  stock: number;
};

type AddCartItem = Omit<CartItem, "cartKey">;

export type AddResult = {
  /** Số lượng thực sự đã thêm. */
  added: number;
  /** true nếu bị giới hạn bởi tồn kho. */
  limited: boolean;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: AddCartItem) => AddResult;
  increaseQuantity: (cartKey: string) => void;
  decreaseQuantity: (cartKey: string) => void;
  removeItem: (cartKey: string) => void;
  clearCart: () => void;
  /** Cập nhật tồn kho mới nhất và giảm số lượng nếu vượt tồn kho. Trả về true nếu giỏ bị điều chỉnh. */
  syncStock: (stockById: Record<number, number>) => boolean;

  getTotalQuantity: () => number;
  getSubtotal: () => number;
};

const NO_LIMIT = Number.MAX_SAFE_INTEGER;

function createCartKey(item: Pick<CartItem, "id" | "size" | "toppings" | "note">) {
  return [
    item.id,
    item.size,
    [...item.toppings].sort().join(","),
    item.note.trim(),
  ].join("|");
}

/** Tổng số lượng của một sản phẩm trong giỏ (cộng mọi size/topping), có thể bỏ qua một dòng. */
export function quantityInCart(items: CartItem[], productId: number, excludeKey?: string) {
  return items
    .filter((item) => item.id === productId && item.cartKey !== excludeKey)
    .reduce((total, item) => total + item.quantity, 0);
}

export const useCartStore = create<CartStore>()(persist((set, get) => ({
  items: [],

  addItem: (item) => {
    const cartKey = createCartKey(item);
    const { items } = get();
    const existing = items.find((current) => current.cartKey === cartKey);
    const room = Math.max(0, item.stock - quantityInCart(items, item.id, cartKey));
    const currentQuantity = existing?.quantity ?? 0;
    const nextQuantity = Math.min(currentQuantity + item.quantity, room);
    const added = Math.max(0, nextQuantity - currentQuantity);

    if (added > 0) {
      set((state) => {
        const refreshed = state.items.map((current) =>
          current.id === item.id ? { ...current, stock: item.stock } : current,
        );
        if (existing) {
          return {
            items: refreshed.map((current) =>
              current.cartKey === cartKey ? { ...current, quantity: nextQuantity } : current,
            ),
          };
        }
        return { items: [...refreshed, { ...item, quantity: added, cartKey }] };
      });
    }

    return { added, limited: added < item.quantity };
  },

  increaseQuantity: (cartKey) => {
    set((state) => {
      const target = state.items.find((item) => item.cartKey === cartKey);
      if (!target) return state;
      const room = (target.stock ?? NO_LIMIT) - quantityInCart(state.items, target.id, cartKey);
      if (target.quantity + 1 > room) return state;
      return {
        items: state.items.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    });
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

  syncStock: (stockById) => {
    let changed = false;
    const items = get().items.map((item) => ({ ...item }));
    for (const [rawId, stock] of Object.entries(stockById)) {
      const productId = Number(rawId);
      let remaining = stock;
      for (const line of items.filter((item) => item.id === productId)) {
        const quantity = Math.min(line.quantity, Math.max(0, remaining));
        if (quantity !== line.quantity) changed = true;
        line.quantity = quantity;
        line.stock = stock;
        remaining -= quantity;
      }
    }
    set({ items: items.filter((item) => item.quantity > 0) });
    return changed;
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
}), {
  name: "brewLite-cart",
  version: 1,
  // Giỏ hàng cũ chưa lưu tồn kho: coi như không giới hạn cho tới khi đồng bộ lại.
  migrate: (persisted) => {
    const state = persisted as { items?: CartItem[] };
    return {
      ...state,
      items: (state.items ?? []).map((item) => ({ ...item, stock: item.stock ?? NO_LIMIT })),
    } as CartStore;
  },
}));
