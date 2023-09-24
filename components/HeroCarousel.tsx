"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { heroImages } from "@/constants";

const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop={true}
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((heroImg) => (
          <Image
            src={heroImg.imgUrl}
            alt={heroImg.alt}
            width={484}
            height={484}
            key={heroImg.alt}
            className='object-contain'
          />
        ))}
      </Carousel>

      <Image
        src='assets/icons/hand-drawn-arrow.svg'
        alt='hero'
        width={175}
        height={175}
        className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
      />
    </div>
  );
};

export default HeroCarousel;
