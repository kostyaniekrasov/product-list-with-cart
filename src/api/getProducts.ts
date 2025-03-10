import { ProductType } from '@/types';

const getProducts = async () => {
  try {
    const response = await fetch('products/data.json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return (await response.json()) as ProductType[];
  } catch (error) {
    console.error('Error fetching products', error);

    return [];
  }
};

export default getProducts;
