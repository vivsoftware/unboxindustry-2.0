import React, { lazy, Suspense, memo, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getStrapiMedia } from '../../../Utils/media';
import ImageSkeletonLoaderBanner from '../../Element/ImageSkeletonLoader'
//import Image from 'next/image';
//implementing lazy load.
const LazyImg = lazy(() => import('next/image'));
// const MainSliderCard = (ElectronicSliderFilter) => {
 
//   const imgData = getStrapiMedia(ElectronicSliderFilter.ElectronicSliderFilter.mainSlider);
  

//   return (
//     <>
//         <Carousel className='home-page' indicators={true} prevIcon={null} nextIcon={null}>
//           {imgData?.map((url, index) => (
//             <Carousel.Item key={index} interval={800}>
//               {/* <Img src={url} className="main-sliderImage" /> */}
//               {/* <Image src={url} width={1300} height={300} className="main-sliderImage" alt='Unbox-Banner' /> */}
//               <Suspense fallback={<ImageSkeletonLoaderBanner />}>
//                 <LazyImg  
//                   src={url}
//                   width={1300}
//                   height={300}
//                   className="main-sliderImage"
//                   alt='Unbox-Banner'
//                 />
//               </Suspense>
//             </Carousel.Item>
//           ))}
          
//         </Carousel>
//     </>
//   );
// };


//using memoization.
const MainSliderCard = memo(({ ElectronicSliderFilter }) => {

  const imgData = useMemo(() => {
    return getStrapiMedia(ElectronicSliderFilter.mainSlider);
  },[ElectronicSliderFilter]);

  return (
        <>
            <Carousel className='home-page' indicators={true} prevIcon={null} nextIcon={null}>
              {imgData?.map((url, index) => (
                <Carousel.Item key={index} interval={800}>
                  {/* <Img src={url} className="main-sliderImage" /> */}
                  {/* <Image src={url} width={1300} height={300} className="main-sliderImage" alt='Unbox-Banner' /> */}
                  <Suspense fallback={<ImageSkeletonLoaderBanner />}>
                    <LazyImg  
                      src={url}
                      width={1300}
                      height={300}
                      className="main-sliderImage"
                      alt='Unbox-Banner'
                    />
                  </Suspense>
                </Carousel.Item>
              ))}
              
            </Carousel>
        </>
      );
});

export default MainSliderCard;