import { CartType } from '@/types';

interface CartContextType {
  cart: CartType[];
  addToCart: (item: CartType) => void;
  removeFromCart: (itemId: string) => void;
  decrementQuantity: (title: string) => void;
  incrementQuantity: (title: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  isOrderConfirmed: boolean;
  confirmOrder: () => void;
  startNewOrder: () => void;
}

export default CartContextType;
