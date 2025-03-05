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
      <div className="font-['Red Hat Text'] flex flex-col gap-8 bg-rose-50 p-5 font-normal">
        <ProductList
          products={products}
          isLoading={isLoading}
        />

        <Cart />
        <div className="flex">
          <div className="bg-red h-10 w-10">red</div>
          <div className="bg-green h-10 w-10">green</div>
          <div className="h-10 w-10 bg-rose-50">50</div>
          <div className="h-10 w-10 bg-rose-100">100</div>
          <div className="h-10 w-10 bg-rose-300">300</div>
          <div className="h-10 w-10 bg-rose-400">400</div>
          <div className="h-10 w-10 bg-rose-500">500</div>
          <div className="h-10 w-10 bg-rose-900">900</div>
        </div>
        <div className="flex">
          <p className="text-2xl font-normal">400</p>
          <p className="text-2xl font-semibold">600</p>
          <p className="text-2xl font-bold">700</p>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
