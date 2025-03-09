import { useEffect, useState } from 'react';
import { Cart, ProductList } from '@/components';
import { ProductType } from '@/types';
import { getProducts } from '@/api';
import { CartProvider } from '@/context';

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      const data = await getProducts();

      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <div className="font-['Red Hat Text'] bg-rose-50 font-normal">
        <div
          className="mx-auto flex flex-col items-center gap-8 p-5 sm:max-w-2xl lg:max-w-3xl
            xl:max-w-7xl xl:flex-row xl:items-start xl:py-16"
        >
          <ProductList
            products={products}
            isLoading={isLoading}
          />

          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
