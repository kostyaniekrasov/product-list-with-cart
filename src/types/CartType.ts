import { ProductType } from '@/types';

interface CartType extends ProductType {
  quantity: number;
}

export default CartType;
