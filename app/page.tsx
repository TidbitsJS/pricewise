import Image from "next/image";
import Link from "next/link";

import { Searchbar, HeroCarousel } from "@/components";
import { products } from "@/constants";

interface Product {
  title: string;
  category: string;
  image: string;
  currency: string;
  currentPrice: number;
  id: number;
}

function Home() {
  return (
    <>
      <section className='px-6 md:px-20 pt-16 pb-24'>
        <div className='md:px-8 flex max-xl:flex-col gap-5'>
          <div className='flex flex-col justify-center'>
            <p className='pl-3 flex gap-2 text-sm font-medium text-primary'>
              Smart Shopping Starts Here:
              <Image
                src='assets/icons/arrow-right.svg'
                alt='arrow right'
                width={16}
                height={16}
              />
            </p>

            <h1 className='mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900'>
              Unleash the Power of
              <span className='text-primary'>PriceWise</span>
            </h1>

            <p className='mt-6 text-xl leading-[30px] text-gray-600'>
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className='flex flex-col gap-10 px-6 md:px-[100px] py-20'>
        <div className='flex justify-between items-center flex-wrap gap-3'>
          <h2 className='text-secondary text-[32px] font-semibold'>Trending</h2>

          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-1'>
              <p className='text-xs font-medium text-neutral-black'>Display</p>

              <Image
                src='/assets/icons/frame.svg'
                alt='frame'
                width={12}
                height={12}
              />

              <Image
                src='/assets/icons/square.svg'
                alt='square'
                width={12}
                height={12}
              />
            </div>

            <div className='flex items-center gap-1 px-5 py-3 border border-[#DBE0FF] rounded-[25px]'>
              <p className='text-xs text-neutral-black'>
                Sort by: Most Relevant
              </p>

              <Image
                src='/assets/icons/chevron-down.svg'
                alt='chevron down'
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-6'>
          {products.map((product: Product) => (
            <Link
              key={product.id}
              href={`${product.id}`}
              className='min-w-[292px] max-w-[25%] w-full flex-1 flex flex-col gap-6'
            >
              <div className='flex-1 flex flex-col gap-5 bg-[#F4F4F4] p-1'>
                <div className='p-1 bg-white rounded-sm ml-auto'>
                  <Image
                    src='/assets/icons/black-heart.svg'
                    alt='heart'
                    width={16}
                    height={16}
                  />
                </div>

                <Image
                  src={product.image}
                  alt='trending'
                  width={200}
                  height={200}
                  className=' max-h-[250px]  object-contain w-full h-full bg-transparent'
                />
              </div>

              <div className='flex flex-col gap-3'>
                <h3 className='text-secondary text-xl leading-6 font-semibold truncate'>
                  {product.title}
                </h3>

                <div className='flex justify-between'>
                  <p className='text-black opacity-50 text-lg'>
                    {product.category}
                  </p>

                  <p className='text-black text-lg font-semibold'>
                    <span>{product.currency}</span>{" "}
                    <span>{product.currentPrice}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
