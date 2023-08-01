import Image from "next/image";
import Link from "next/link";

import { Modal } from "@/components";

function Page() {
  return (
    <section className='flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24'>
      <div className='flex gap-28 flex-wrap'>
        <div className='flex-grow py-16 border border-[#CDDBFF] rounded-[17px]'>
          <Image
            src='/assets/images/details.svg'
            alt='laptop'
            width={580}
            height={400}
            className='mx-auto'
          />
        </div>

        <div className='flex-grow flex flex-col'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='max-w-xs text-[28px] text-secondary font-semibold'>
                Example
              </p>

              <p className='text-base text-black opacity-50'>Exmp</p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-[10px]'>
                <Image
                  src='/assets/icons/red-heart.svg'
                  alt='heart'
                  width={20}
                  height={20}
                />

                <p className='text-base font-semibold text-[#D46F77]'>123</p>
              </div>

              <div className='p-2 bg-[#EDF0F8] rounded-[10px]'>
                <Image
                  src='/assets/icons/bookmark.svg'
                  alt='bookmark'
                  width={20}
                  height={20}
                />
              </div>

              <div className='p-2 bg-[#EDF0F8] rounded-[10px]'>
                <Image
                  src='/assets/icons/share.svg'
                  alt='share'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className='flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]'>
            <div className='flex flex-col gap-2'>
              <p className='text-[34px] text-secondary font-bold'>$ 1300</p>

              <p className='text-[21px] text-black opacity-50 line-through'>
                $ 1300
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex gap-3'>
                <div className='flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]'>
                  <Image
                    src='/assets/icons/star.svg'
                    alt='star'
                    width={16}
                    height={16}
                  />
                  <p className='text-sm text-[#D48D3B] font-semibold'>50</p>
                </div>

                <div className='flex items-center gap-2 px-3 py-2 bg-[#EDF0F8] rounded-[27px]'>
                  <Image
                    src='/assets/icons/comment.svg'
                    alt='comment'
                    width={16}
                    height={16}
                  />
                  <p className='text-sm text-secondary font-semibold'>
                    460 Reviews
                  </p>
                </div>
              </div>

              <p className='text-sm text-black opacity-50'>
                <span className='text-[#3E9242] font-semibold'>93% </span>of
                buyers have recommended this.
              </p>
            </div>
          </div>

          <div className='py-7 flex flex-col gap-5'>
            <div className='flex gap-5  flex-wrap'>
              <div className='flex-1 flex flex-col gap-2 border-l-[3px] border-l-[#B6DBFF] rounded-[10px] bg-[#F4F4F4] px-5 py-4'>
                <p className='text-base text-[#3D4258]'>Current Price</p>

                <div className='flex gap-1'>
                  <Image
                    src='/assets/icons/price-tag.svg'
                    alt='price tag'
                    width={24}
                    height={24}
                  />

                  <p className='text-2xl font-bold text-secondary'>$ 5000</p>
                </div>
              </div>

              <div className='flex-1  flex flex-col gap-2 border-l-[3px] border-l-[#D0BFFF] rounded-[10px] bg-[#F4F4F4] px-5 py-4'>
                <p className='text-base text-[#3D4258]'>Average Price</p>

                <div className='flex gap-1'>
                  <Image
                    src='/assets/icons/chart.svg'
                    alt='chart'
                    width={24}
                    height={24}
                  />

                  <p className='text-2xl font-bold text-secondary'>$ 5000</p>
                </div>
              </div>
            </div>

            <div className='flex gap-5  flex-wrap'>
              <div className='flex-1 flex flex-col gap-2 border-l-[3px] border-l-[#FCC] rounded-[10px] bg-[#F4F4F4] px-5 py-4'>
                <p className='text-base text-[#3D4258]'>Highest Price</p>

                <div className='flex gap-1'>
                  <Image
                    src='/assets/icons/arrow-up.svg'
                    alt='arrow up'
                    width={24}
                    height={24}
                  />

                  <p className='text-2xl font-bold text-secondary'>$ 6000</p>
                </div>
              </div>

              <div className='flex-1 flex flex-col gap-2 border-l-[3px] border-l-[#BEFFC5] rounded-[10px] bg-[#F4F4F4] px-5 py-4'>
                <p className='text-base text-[#3D4258]'>Lowest Price</p>

                <div className='flex gap-1'>
                  <Image
                    src='/assets/icons/arrow-down.svg'
                    alt='arrow-down'
                    width={24}
                    height={24}
                  />

                  <p className='text-2xl font-bold text-secondary'>$ 2300</p>
                </div>
              </div>
            </div>
          </div>

          <Modal />
        </div>
      </div>

      <div className='flex flex-col gap-36'>
        <div className='flex flex-col gap-5'>
          <h3 className='text-2xl text-secondary font-semibold'>
            Product Description
          </h3>

          <div className='flex flex-col gap-4'>
            {["Something", "Very good", "That's nice", "Cool things"]?.map(
              (item, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <Image
                    src='/assets/icons/check.svg'
                    alt='check'
                    width={20}
                    height={20}
                  />

                  <p className='text-base leading-[27px] text-black opacity-50'>
                    {item}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <button className='w-fit mx-auto flex items-center gap-3 px-24 py-5 bg-secondary rounded-[30px]'>
          <Image
            src='/assets/icons/bag.svg'
            alt='check'
            width={22}
            height={22}
          />

          <Link href={`/`} className='text-base text-white'>
            Buy Now
          </Link>
        </button>
      </div>

      <div className='py-14 flex flex-col gap-8'>
        <div className='flex flex-col items-center gap-2 text-secondary'>
          <p className='text-base font-semibold leading-[26px]'>
            SHOP TECH ESSENTIALS
          </p>

          <p className='text-center text-5xl leading-[62px] tracking-[-1px] font-semibold'>
            Similar Products
          </p>
        </div>

        <div className='flex flex-wrap gap-6'></div>
      </div>
    </section>
  );
}

export default Page;
