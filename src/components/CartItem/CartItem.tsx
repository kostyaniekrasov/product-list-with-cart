import { IconRemoveItem } from '@/assets';
import { useCart } from '@/context';
import { CartType } from '@/types';

interface Props {
  item: CartType;
  isOrderConfirmed?: boolean;
}

const CartItem = ({ item, isOrderConfirmed }: Props) => {
  const { name, price, quantity, image } = item;
  const { removeFromCart } = useCart();
  const totalPrice = quantity * price;

  return (
    <div
      className={`flex items-center justify-between border-b
        ${isOrderConfirmed ? 'border-rose-300/30' : 'border-rose-100'} pb-4`}
    >
      <div className="flex items-center gap-3">
        {isOrderConfirmed && (
          <div
            style={
              {
                '--thumbnail-url': `url(${image.thumbnail})`,
              } as React.CSSProperties
            }
            className="flex h-14 w-14 rounded-lg bg-[image:var(--thumbnail-url)] bg-cover object-cover"
            data-url={image.thumbnail}
          />
        )}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{name}</p>

          <div className="flex items-center gap-3">
            <p className="text-red text-sm font-bold">{`${quantity}x`}</p>
            <p className="text-xs font-semibold text-rose-900/40">{`@ $${price.toFixed(2)}`}</p>
            {!isOrderConfirmed && (
              <p className="text-xs font-semibold text-rose-400">{`$${totalPrice.toFixed(2)}`}</p>
            )}
          </div>
        </div>
      </div>

      {!isOrderConfirmed && (
        <button
          type="button"
          className="cursor-pointer rounded-full border-2 border-rose-300 p-0.5 text-rose-300
            duration-300 hover:border-rose-900 hover:text-rose-900"
          onClick={() => removeFromCart(name)}
        >
          <IconRemoveItem
            width={9}
            height={9}
          />
        </button>
      )}
      {isOrderConfirmed && (
        <p className="text-sm font-semibold">{`$${totalPrice.toFixed(2)}`}</p>
      )}
    </div>
  );
};

export default CartItem;
