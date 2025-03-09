import { IconOrderConfirmed } from '@/assets';
import { useCart } from '@/context';
import { CartList } from '../CartList';
import { motion } from 'framer-motion';

const OrderConfirmedScreen = () => {
  const { cart, getCartTotal, startNewOrder } = useCart();

  return (
    <motion.div
      key="confScreen"
      className="fixed inset-0 z-10 flex h-screen flex-col justify-end bg-black/40
        lg:items-center lg:justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="rounded-t-xl bg-white px-5 pt-10 lg:w-xl lg:px-10"
      >
        <IconOrderConfirmed className="text-green mb-5" />

        <h1 className="mb-3 text-4xl font-bold text-balance">
          Order Confirmed
        </h1>

        <p className="mb-8 text-rose-400">We hope you enjoy your food!</p>

        <div className="mb-8 flex flex-col gap-6 rounded-lg bg-rose-100 p-5">
          <CartList
            cartItems={cart}
            isOrderConfirmed
          />

          <div className="flex items-center justify-between">
            <p className="text-sm">Order Total</p>
            <p className="text-2xl font-bold">{`$${getCartTotal().toFixed(2)}`}</p>
          </div>
        </div>

        <button
          type="button"
          className="bg-red mb-8 w-full cursor-pointer rounded-3xl p-3 text-sm font-semibold
            text-rose-100"
          onClick={() => startNewOrder()}
        >
          Start New Order
        </button>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmedScreen;
