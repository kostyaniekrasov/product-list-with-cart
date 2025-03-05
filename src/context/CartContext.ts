import { CartContextType } from '@/types';
import { createContext } from 'react';

const CartContext = createContext<CartContextType | null>(null);

export default CartContext;
