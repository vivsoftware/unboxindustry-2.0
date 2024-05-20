import React, { lazy, Suspense } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getStrapiMedia } from '../../../Utils/media';
import Image from 'next/image';
//unimplementing lazy load.
// const LazyImg = lazy(() => import('next/image'));
const MainSliderCard = (ElectronicSliderFilter) => {
 
  const imgData = getStrapiMedia(ElectronicSliderFilter.ElectronicSliderFilter.mainSlider);

  return (
    <>
        <Carousel className='home-page' indicators={true} prevIcon={null} nextIcon={null}>
          {imgData?.map((url, index) => (
            <Carousel.Item key={index} interval={800}>
              {/* <Img src={url} className="main-sliderImage" /> */}
              {/* <Image src={url} width={1300} height={300} className="main-sliderImage" alt='Unbox-Banner' /> */}
            
                <Image 
                  src={url}
                  width={1300}
                  height={300}
                  className="main-sliderImage"
                  alt='Unbox-Banner'
                />
              
            </Carousel.Item>
          ))}
          {/* <Carousel.Item  interval={800}>
              <Img src="desktopBanner1.svg" className="main-sliderImage" />
            </Carousel.Item>
            <Carousel.Item  interval={800}>
              <Img src="desktopBanner2.svg" className="main-sliderImage" />
            </Carousel.Item>
            <Carousel.Item  interval={800}>
              <Img src="desktopBanner3.svg" className="main-sliderImage" />
            </Carousel.Item> */}
        </Carousel>
    </>
  );
};

export default MainSliderCard;