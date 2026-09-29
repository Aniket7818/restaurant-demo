import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { MenuItem } from '../data/menu';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREASE_QTY'; payload: string }
  | { type: 'DECREASE_QTY'; payload: string }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'urban_plate_cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.payload) };
    case 'INCREASE_QTY':
      return {
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREASE_QTY':
      return {
        items: state.items
          .map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i)
          .filter(i => i.quantity > 0),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    // ignore
  }
  return { items: [] };
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        increaseQty: (id) => dispatch({ type: 'INCREASE_QTY', payload: id }),
        decreaseQty: (id) => dispatch({ type: 'DECREASE_QTY', payload: id }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { useCart } from '../hooks/useCart';
