import { CartType } from '@/types';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import CartContext from './CartContext';

interface Props {
  children: ReactNode;
}

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartType[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((item: CartType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name,
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      }
      return [...prevCart, item];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemId));
  }, []);

  const decrementQuantity = useCallback((title: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === title ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const incrementQuantity = useCallback((title: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === title ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const confirmOrder = useCallback(() => {
    setIsOrderConfirmed(true);
  }, []);

  const startNewOrder = useCallback(() => {
    setCart([]);
    setIsOrderConfirmed(false);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      decrementQuantity,
      incrementQuantity,
      clearCart,
      getCartTotal,
      isOrderConfirmed,
      confirmOrder,
      startNewOrder,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      decrementQuantity,
      incrementQuantity,
      isOrderConfirmed,
      confirmOrder,
      startNewOrder,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
