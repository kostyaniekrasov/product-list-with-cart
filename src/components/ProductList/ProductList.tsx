import { ProductType } from '@/types';
import { ProductItem } from '../ProductItem';

interface Props {
  products: ProductType[];
  isLoading: boolean;
}

const ProductList = ({ products, isLoading }: Props) => {
  return (
    <div>
      <h3 className="font-bold text-rose-900 text-4xl mb-4">Desserts</h3>
      {isLoading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div
            className="w-15 h-15 border-5 text-blue-400 text-4xl animate-spin border-gray-300 flex
              items-center justify-center border-t-blue-400 rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center sm:grid sm:grid-cols-2 gap-x-5 gap-y-7">
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
