import Link from "next/link";
import Image from "next/image";

import { navIcons } from "@/constants";

const Navbar = () => {
  return (
    <header className='w-full'>
      <nav className='flex justify-between items-center px-6 md:px-[52px] py-4'>
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src='/assets/icons/logo.svg'
            alt='logo'
            width={27}
            height={27}
          />

          <p className='font-spaceGrotesk text-[21px] text-secondary font-bold'>
            Price<span className='text-primary'>Wise</span>
          </p>
        </Link>

        <div className='flex items-center gap-5'>
          {navIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className='object-contain cursor-pointer'
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
