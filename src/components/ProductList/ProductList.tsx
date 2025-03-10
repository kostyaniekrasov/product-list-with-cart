import { ProductType } from '@/types';
import { ProductItem } from '../ProductItem';

interface Props {
  products: ProductType[];
  isLoading: boolean;
}

const ProductList = ({ products, isLoading }: Props) => {
  return (
    <div className="w-full">
      <h3 className="mb-4 text-4xl font-bold text-rose-900">Desserts</h3>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className="flex h-15 w-15 animate-spin items-center justify-center rounded-full border-5
              border-gray-300 border-t-blue-400 text-4xl text-blue-400"
          />
        </div>
      ) : (
        <div
          className="flex w-full flex-col items-center gap-x-5 gap-y-7 sm:grid sm:grid-cols-2
            sm:gap-x-4 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductItem
              key={product.name}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
