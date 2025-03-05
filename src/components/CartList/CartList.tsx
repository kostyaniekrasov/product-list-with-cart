import { CartType } from '@/types';
import { CartItem } from '../CartItem';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  cartItems: CartType[];
  isOrderConfirmed?: boolean;
}

const CartList = ({ cartItems, isOrderConfirmed }: Props) => {
  return (
    <motion.div
      layout
      className="flex flex-col gap-4"
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
    >
      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.div
            key={item.name}
            layout
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 900, damping: 40 }}
          >
            <CartItem
              item={item}
              isOrderConfirmed={isOrderConfirmed}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CartList;
