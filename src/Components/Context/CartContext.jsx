/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("favoritesItems");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  // Cart
  const [cartItems, setcartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (item) => {
    setcartItems((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        // لو المنتج موجود نزود الكمية
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Number(i.quantity || 0) + 1 }
            : i
        );
      }
      // لو جديد، نتأكد من وجود quantity ورقم صحيح للـ price
      return [...prev, { ...item, quantity: 1, price: Number(item.price) }];
    });
  };

  const increaseQuantity = (id) => {
    setcartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Number(item.quantity || 0) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setcartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: Number(item.quantity || 0) - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setcartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
