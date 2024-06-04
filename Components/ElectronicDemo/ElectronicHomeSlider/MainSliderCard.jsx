import React, { memo, useEffect, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getStrapiMedia } from '../../../Utils/media';
//import Image from 'next/image';

//using memoization.
//removed lazy load because lcp was laizly loaded.
const MainSliderCard = memo(({ ElectronicSliderFilter }) => {

  const imgData = useMemo(() => {
    return getStrapiMedia(ElectronicSliderFilter.mainSlider);
  },[ElectronicSliderFilter]);

  useEffect(() => {
    imgData?.forEach (url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'image';
      document.head.appendChild(link);
    });

    return () => {
      imgData?.forEach (url => {
        const links = document.querySelectorAll(`link[rel="preload"][href="${url}"]`);
        links.forEach(link => document.head.removeChild(link));
      });
    };
  }, [imgData]);

  return (
        <>
            <Carousel className='home-page' indicators={true} prevIcon={null} nextIcon={null}>
              {imgData?.map((url, index) => (
                <Carousel.Item key={index} interval={800}>
                  <img src={url} width={1300} height={300} className="main-sliderImage" alt='Unbox-Banner' />
                </Carousel.Item>
              ))}
              
            </Carousel>
        </>
      );
});

export default MainSliderCard;