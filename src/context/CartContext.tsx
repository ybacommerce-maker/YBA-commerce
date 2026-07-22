"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/lib/types";

// ==========================================================
//  CARRINHO DE COMPRAS
//  Guarda os itens em memoria e tambem no localStorage do navegador,
//  para o carrinho nao sumir quando a pessoa recarrega a pagina.
// ==========================================================

interface CartContextType {
  items: CartItem[];
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carrega do localStorage quando abre o site
  useEffect(() => {
    try {
      const saved = localStorage.getItem("yba_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Salva sempre que muda
  useEffect(() => {
    try {
      localStorage.setItem("yba_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function add(product: Product, quantity = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return remove(productId);
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQuantity, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
