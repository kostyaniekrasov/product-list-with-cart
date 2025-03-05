import {
  IconAddToCart,
  IconDecrementQuantity,
  IconIncrementQuantity,
} from '@/assets';
import { useCart } from '@/context';
import { ProductType } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  product: ProductType;
}

const ProductItem = ({ product }: Props) => {
  const { image, name, category, price } = product;
  const { addToCart, cart, incrementQuantity, decrementQuantity } = useCart();

  const currentItemInCart = cart.find((item) => item.name === name);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div
          style={
            { '--image-url': `url(${image.mobile})` } as React.CSSProperties
          }
          className="flex h-52 w-80 rounded-xl bg-[image:var(--image-url)] bg-cover object-cover
            sm:w-full"
          data-url={image.mobile}
        />

        <AnimatePresence mode="wait">
          {currentItemInCart ? (
            <motion.div
              key={'inCart'}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              <div
                className="border-red bg-red right-0 bottom-0 left-0 flex w-40 -translate-y-1/2 transform
                  items-center justify-between rounded-3xl border px-2 py-2 text-sm font-normal
                  text-rose-100"
              >
                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-rose-100 p-1"
                  onClick={() => decrementQuantity(name)}
                >
                  <IconDecrementQuantity
                    width={8}
                    height={8}
                  />
                </button>
                {currentItemInCart.quantity}
                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-rose-100 p-1"
                  onClick={() => incrementQuantity(name)}
                >
                  <IconIncrementQuantity
                    width={8}
                    height={8}
                  />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={'addCart'}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              <button
                className="border-red right-0 bottom-0 left-0 flex w-40 -translate-y-1/2 transform
                  cursor-pointer items-center justify-center gap-2 rounded-3xl border bg-white
                  py-2 text-sm font-semibold"
                type="button"
                onClick={() => addToCart({ ...product, quantity: 1 })}
              >
                <IconAddToCart className="text-red" />
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-rose-500">{category}</p>
      <p className="text-base font-semibold text-rose-900">{name}</p>
      <p className="text-red font-semibold">{`$${price.toFixed(2)}`}</p>
    </div>
  );
};

export default ProductItem;
