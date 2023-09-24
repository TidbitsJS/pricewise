import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
      <div className='product-card_img-container'>
        <Image
          src={product.image}
          alt='trending'
          width={200}
          height={200}
          className='product-card_img'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='product-title'>{product.title}</h3>

        <div className='flex justify-between'>
          <p className='text-black opacity-50 text-lg'>
            General
            {/* {product?.category} */}
          </p>

          <p className='text-black text-lg font-semibold'>
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
