import { IconCarbonNeutral, IconIllustrationEmptyCart } from '@/assets';
import { useCart } from '@/context';
import { AnimatePresence, motion } from 'framer-motion';
import { CartList } from '../CartList';
import { OrderConfirmedScreen } from '../OrderConfirmedScreen';

const Cart = () => {
  const { cart, getCartTotal, confirmOrder, isOrderConfirmed } = useCart();

  return (
    <AnimatePresence mode="wait">
      {isOrderConfirmed && <OrderConfirmedScreen />}

      {!isOrderConfirmed && (
        <motion.div
          key="cartContainer"
          className="flex flex-col items-center rounded-xl bg-white p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <h2 className="text-red mb-4 self-start text-2xl font-bold">
            Your Cart ({cart.length})
          </h2>

          <motion.div
            key="wrapper"
            layout
            transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
          >
            <AnimatePresence mode="wait">
              {!cart.length && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IconIllustrationEmptyCart />
                  <p className="mb-5 text-sm text-rose-400">
                    Your added items will appear here
                  </p>
                </motion.div>
              )}

              {!!cart.length && (
                <motion.div
                  key="cartList"
                  className="w-full"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col gap-5">
                    <CartList cartItems={cart} />

                    <div className="flex items-center justify-between">
                      <p className="text-sm">Order Total</p>
                      <p className="text-2xl font-bold text-rose-900">{`$${getCartTotal().toFixed(2)}`}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-sm bg-rose-100 p-4">
                      <IconCarbonNeutral className="text-green" />
                      <p className="text-sm">
                        This is a{' '}
                        <span className="font-semibold">{` carbon-neutral `}</span>
                        delivery
                      </p>
                    </div>

                    <button
                      type="button"
                      className="bg-red rounded-3xl p-3 text-base text-rose-50"
                      onClick={() => confirmOrder()}
                    >
                      Confirm Order
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
