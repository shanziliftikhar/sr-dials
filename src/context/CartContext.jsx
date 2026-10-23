import { createContext, useContext, useEffect, useReducer } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("sr-cart"));
    if (!Array.isArray(savedCart)) return [];

    return savedCart.map((item) => {
      const product = products.find((catalogProduct) => catalogProduct.id === item.id);
      return product ? { ...item, ...product, qty: item.qty } : item;
    });
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const qty = action.qty || 1;
      const exists = state.find((item) => item.id === action.product.id);
      if (exists)
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, ...action.product, qty: item.qty + qty }
            : item
        );
      return [...state, { ...action.product, qty }];
    }
    case "QTY":
      return state.map((item) =>
        item.id === action.id ? { ...item, qty: action.qty } : item
      );
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCart
  );

  useEffect(() => {
    localStorage.setItem("sr-cart", JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

// Context hooks are exported alongside their provider, matching the wishlist context.
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
