import {lazy, Suspense, useEffect, useState } from 'react';
import Slider from 'react-slick'
import { Col, Container, Row } from 'reactstrap';
import { FlowerBrandData } from '../../../Data/FlowerBrand';
import { FlowerBrandSlider } from '../../../Data/SliderSettingsData';
import { fetchAPI } from '../../../Utils/api';
import { getStrapiMedia } from '../../../Utils/media';
// import Image from 'next/image';
import Link from 'next/link';
import SkeletonLoader from '../../Element/SkeletonLoader';

const LazyImg = lazy(() => import('next/image'));
const Brand = () => {
    const [brandData, setbrandData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
    useEffect(() => {
  
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

    useEffect(() => {
         // Fetching brands in optimized way
    fetch("https://strapi.unboxindustry.com/api/brands?populate[0]=brand_image", requestOptions)
    .then((response) => response.json())
    .then((result) => setbrandData(result.data))
    .catch((error) => console.error("Error fetching brands:", error));
    },[])


    return (
        <section className="section-b-space">
            <Container className='home-page'>
                <Row>
                    <h2 className='text-center mt-5 '>Our Partners</h2>
                    <Col>
                        <div className="brand-slider">
                            <Slider {...FlowerBrandSlider}>
                                {
                                    brandData?.map((elem) => {
                                        return (
                                            <div key={elem.id}>
                                                <div className="brand-image">
                                                    <Link href={`/brand/${elem.id}-${elem.attributes.brand_slug}`}>
                                                        {isLoading? (
                                                            <SkeletonLoader/>
                                                        ):(
                                                            <Suspense fallback={<div>Loading....</div>}>
                                                            <LazyImg
                                                                src={getStrapiMedia(elem.attributes.brand_image)}
                                                                className='img-fluid'
                                                                width={200}
                                                                height={100}
                                                                alt={elem.attributes.brand_name}
                                                                layout='responsive'
                                                                objectFit='cover'
                                                            />
                                                        </Suspense >
                                                        
                                                           
                                                        )}
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Brand;