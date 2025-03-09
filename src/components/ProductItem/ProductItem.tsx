import {
  IconAddToCart,
  IconDecrementQuantity,
  IconIncrementQuantity,
} from '@/assets';
import { useCart } from '@/context';
import { ProductType } from '@/types';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  product: ProductType;
}

const ProductItem = ({ product }: Props) => {
  const { image, name, category, price } = product;
  const { addToCart, cart, incrementQuantity, decrementQuantity } = useCart();
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [pathLength, setPathLength] = useState(0);
  const currentItemInCart = cart.find((item) => item.name === name);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });

        setPathLength(entry.contentRect.width + entry.contentRect.height);
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const { width, height } = size;

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="relative w-full">
          <div
            ref={containerRef}
            style={
              {
                '--image-mobile-url': `url(${image.mobile})`,
                '--image-tablet-url': `url(${image.tablet})`,
                '--image-desktop-url': `url(${image.desktop})`,
              } as React.CSSProperties
            }
            className={classNames(
              `box-border flex h-52 w-80 rounded-xl border-2 border-rose-50
              bg-[image:var(--image-mobile-url)] bg-cover object-cover sm:w-full
              sm:bg-[image:var(--image-tablet-url)] xl:bg-[image:var(--image-desktop-url)]`,
            )}
            data-url={image.mobile}
          />

          {width > 0 && height > 0 && (
            <svg
              className="pointer-events-none absolute top-0 left-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              <motion.path // left
                d={`M ${width / 2} ${height - 1} 
                h-${width / 2 - 13} 
                a 12 12 0 0 1 -12 -12 
                v-${height - 24 - 2} 
                a 12 12 0 0 1 12 -12 
                h${width / 2 - 12}`}
                stroke="var(--color-red)"
                strokeWidth={2}
                fill={'none'}
                initial={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength,
                }}
                animate={currentItemInCart ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />

              <motion.path // right
                d={`M ${width / 2} ${height - 1} h ${width / 2 - 13} 
              a 12 12 0 0 0 12 -12
              v-${height - 24 - 2} 
              a 12 12 0 0 0 -12 -12
              h-${width / 2 - 12}
              `}
                stroke="var(--color-red)"
                strokeWidth={2}
                fill={'none'}
                initial={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength,
                }}
                animate={currentItemInCart ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </svg>
          )}
        </div>

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
                  className="hover:text-red cursor-pointer rounded-full border border-rose-100 p-1
                    duration-300 hover:bg-rose-50"
                  onClick={() => decrementQuantity(name)}
                >
                  <IconDecrementQuantity
                    width="10"
                    height="10"
                  />
                </button>
                {currentItemInCart.quantity}
                <button
                  type="button"
                  className="hover:text-red cursor-pointer rounded-full border border-rose-100 p-1
                    duration-300 hover:bg-rose-50"
                  onClick={() => incrementQuantity(name)}
                >
                  <IconIncrementQuantity
                    width={10}
                    height={10}
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
                className="hover:border-red hover:text-red right-0 bottom-0 left-0 flex w-40
                  -translate-y-1/2 transform cursor-pointer items-center justify-center gap-2
                  rounded-3xl border border-rose-300 bg-white py-2 text-sm font-semibold
                  duration-300"
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

export default React.memo(ProductItem);
