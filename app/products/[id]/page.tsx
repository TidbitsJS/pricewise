import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Product } from "@/types";
import { Modal } from "@/components";
import ProductCard from "@/components/ProductCard";
import PriceInfoCard from "@/components/PriceInfoCard";

import { formatNumber } from "@/lib/utils";
import { getProductById, getProducts } from "@/lib/actions";

type ProductDetailsProps = {
  params: { id: string };
};

async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = params;

  const product = await getProductById(id);
  if (!product) redirect("/");

  const similarProducts = await getProducts(id);

  return (
    <section className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image || "/assets/images/details.svg"}
            alt='laptop'
            width={580}
            height={400}
            className='mx-auto'
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] text-secondary font-semibold'>
                {product.title}
              </p>

              <Link
                href={product.url}
                target='_blank'
                className='text-base text-black opacity-50'
              >
                Visit Product
              </Link>
            </div>

            <div className='flex items-center gap-3'>
              <div className='product-hearts'>
                <Image
                  src='/assets/icons/red-heart.svg'
                  alt='heart'
                  width={20}
                  height={20}
                />

                <p className='text-base font-semibold text-[#D46F77]'>123</p>
              </div>

              <div className='p-2 bg-white-200 rounded-10'>
                <Image
                  src='/assets/icons/bookmark.svg'
                  alt='bookmark'
                  width={20}
                  height={20}
                />
              </div>

              <div className='p-2 bg-white-200 rounded-10'>
                <Image
                  src='/assets/icons/share.svg'
                  alt='share'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className='product-info'>
            <div className='flex flex-col gap-2'>
              <p className='text-[34px] text-secondary font-bold'>
                {product.currency} {formatNumber(product.currentPrice)}
              </p>

              <p className='text-[21px] text-black opacity-50 line-through'>
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex gap-3'>
                <div className='product-stars'>
                  <Image
                    src='/assets/icons/star.svg'
                    alt='star'
                    width={16}
                    height={16}
                  />
                  <p className='text-sm text-primary-orange font-semibold'>
                    {product.stars}
                  </p>
                </div>

                <div className='product-reviews'>
                  <Image
                    src='/assets/icons/comment.svg'
                    alt='comment'
                    width={16}
                    height={16}
                  />
                  <p className='text-sm text-secondary font-semibold'>
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className='text-sm text-black opacity-50'>
                <span className='text-primary-green font-semibold'>93% </span>of
                buyers have recommended this.
              </p>
            </div>
          </div>

          <div className='my-7 flex flex-col gap-5'>
            <div className='flex gap-5 flex-wrap'>
              <PriceInfoCard
                title='Current Price'
                iconSrc='/assets/icons/price-tag.svg'
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor='#B6DBFF'
              />

              <PriceInfoCard
                title='Average Price'
                iconSrc='/assets/icons/chart.svg'
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
                borderColor='#D0BFFF'
              />
            </div>

            <div className='flex gap-5 flex-wrap'>
              <PriceInfoCard
                title='Highest Price'
                iconSrc='/assets/icons/arrow-up.svg'
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
                borderColor='#FCC'
              />

              <PriceInfoCard
                title='Lowest Price'
                iconSrc='/assets/icons/arrow-down.svg'
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                borderColor='#BEFFC5'
              />
            </div>
          </div>

          <Modal productId={id} />
        </div>
      </div>

      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-5'>
          <h3 className='text-2xl text-secondary font-semibold'>
            Product Description
          </h3>

          <div className='flex flex-col gap-4'>
            {product?.description.split("\n")}
          </div>
        </div>

        <button className='w-fit mx-auto flex items-center justify-center gap-3 btn min-w-[200px]'>
          <Image
            src='/assets/icons/bag.svg'
            alt='check'
            width={22}
            height={22}
          />

          <Link href='/' className='text-base text-white'>
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className='py-14 flex flex-col gap-2 w-full'>
          <p className='section-text'>Similar Products</p>

          <div className='flex flex-wrap gap-10 mt-7 w-full'>
            {similarProducts?.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;
