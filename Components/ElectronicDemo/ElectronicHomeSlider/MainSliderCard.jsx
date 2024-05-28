import React, { memo, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getStrapiMedia } from '../../../Utils/media';
import Image from 'next/image';

//using memoization.
//removed lazy load because lcp was laizly loaded.
const MainSliderCard = memo(({ ElectronicSliderFilter }) => {

  const imgData = useMemo(() => {
    return getStrapiMedia(ElectronicSliderFilter.mainSlider);
  },[ElectronicSliderFilter]);

  return (
        <>
            <Carousel className='home-page' indicators={true} prevIcon={null} nextIcon={null}>
              {imgData?.map((url, index) => (
                <Carousel.Item key={index} interval={800}>
                  <Image src={url} width={1300} height={300} className="main-sliderImage" alt='Unbox-Banner' />
                </Carousel.Item>
              ))}
              
            </Carousel>
        </>
      );
});

export default MainSliderCard;