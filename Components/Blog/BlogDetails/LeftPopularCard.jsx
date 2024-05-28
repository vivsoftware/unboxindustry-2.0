
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick';
import { getStrapiMedia } from '../../../Utils/media';
import Img from '../../Element/Images';
// import { PopularPost } from '../../../Data/BlogData';
const LeftPopularCard = ({ products, categories }) => {
  const data = []
  console.log("PopularPost", products);
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const PopularPost = [
    {
      id: products?.data[8]?.id,
      no: '01',
      description: products?.data[8]?.attributes?.product_short_description,
      title: products?.data[8]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[8]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[8]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[45]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[45]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[45]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[45]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[54]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[54]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[54]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[54]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[70]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[70]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[70]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[70]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[30]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[30]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[30]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[30]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[20]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[20]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[20]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[20]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[40]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[40]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[40]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[40]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[110]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[110]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[110]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[110]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[50]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[50]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[50]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[50]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[1]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[1]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[1]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[1]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[200]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[200]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[200]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[200]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[150]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[150]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[150]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[150]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[120]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[120]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[120]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[120]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
    {
      id: products?.data[10]?.id,
      no: '01',
      description: 'But I must explain to you how all this mistaken idea of denouncing.',
      title: products?.data[10]?.attributes?.product_name,
      in: 'in',
      product_slug: products?.data[10]?.attributes?.product_slug,
      time: '2m ago',
      views: '8596',
      image: products?.data[10]?.attributes?.product_display || 'default_image_url', // Fallback to default image if not found
    },
  ];

  console.log("zopal", PopularPost);
  return (
    <>
      <Carousel
        className='home-page1'
        id="sidebar11"
        style={{ position: "relative", width: "300px", overflow: "hidden" }}
        indicators={false}
        prevIcon={null}
        nextIcon={null}
      >
        {PopularPost.slice(0, 4).map((url, index) => (
          <Carousel.Item key={index} interval={1000} className="custom-carousel-item">
            <Link href={`/product/${url.id}-${url.product_slug}`}>


              <Img
                src={getStrapiMedia(url?.image)}
                className='main-sliderImage11'
                alt="product"
                height={150}
                width={170}
              />
              <p className=''>{url.title}</p>
            </Link>

          </Carousel.Item>
        ))}
      </Carousel>

      <Carousel
        className='home-page1'
        id="sidebar11"
        style={{ position: "relative", width: "300px", overflow: "hidden" }}
        indicators={false}
        prevIcon={null}
        nextIcon={null}
      >
        {PopularPost.slice(4, 8).map((url, index) => (
          <Carousel.Item key={index} interval={1000} className="custom-carousel-item">
            <Link href={`/product/${url.id}-${url.product_slug}`}>

              <Img
                src={getStrapiMedia(url?.image)}
                className='main-sliderImage11'
                alt="product"
                height={150}
                width={170}
              />
              <p className=''>{url.title}</p>
            </Link>

          </Carousel.Item>
        ))}
      </Carousel>

      <Carousel
        className='home-page1'
        id="sidebar11"
        style={{ position: "relative", width: "300px", overflow: "hidden" }}
        indicators={false}
        prevIcon={null}
        nextIcon={null}
      >
        
        {PopularPost.slice(6, 10).map((url, index) => (
          <Carousel.Item key={index} interval={1000} className="custom-carousel-item">
            <Link href={`/product/${url.id}-${url.product_slug}`}>
              <Img
                src={getStrapiMedia(url?.image)}
                className='main-sliderImage11'
                alt="product"
                height={150}
                width={170}
              />
              <p className=''>{url.title}</p>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <Carousel
        className='home-page1'
        id="sidebar11"
        style={{ position: "relative", width: "300px", overflow: "hidden" }}
        indicators={false}
        prevIcon={null}
        nextIcon={null}
      >
        {PopularPost.slice(8, 12).map((url, index) => (
          <Carousel.Item key={index} interval={1000} className="custom-carousel-item">
            <Link href={`/product/${url.id}-${url.product_slug}`}>
              <Img
                src={getStrapiMedia(url?.image)}
                className='main-sliderImage11'
                alt="product"
                height={150}
                width={170}
              />
              <p className=''>{url.title}</p>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <Slider {...settings} className='formobile'>
        <div>
        {PopularPost.slice(6, 10).map((url, index) => (
          <Carousel.Item key={index} interval={1000} className="custom-carousel-item">
            <Link href={`/product/${url.id}-${url.product_slug}`}>
              <Img
                src={getStrapiMedia(url?.image)}
                className='main-sliderImage11'
                alt="product"
                height={150}
                width={170}
              />
              <p className=''>{url.title}</p>
            </Link>
          </Carousel.Item>
        ))}
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_Unitree_Go2_6_copy_jpg_566e2f83df.webp?updatedAt=2024-05-16T10%3A14%3A52.300Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_maxresdefault_6_8e755496ba.jpg?updatedAt=2024-05-14T09%3A08%3A17.417Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_New_Product_Instagram_Post_500_x_500_px_2_eed9f4fad6.png?updatedAt=2024-03-19T11%3A23%3A59.021Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_Black_Minimalist_Luxury_Traditional_Ram_Navami_Greeting_Instagram_Post_87b6cad9f4.png?updatedAt=2024-04-24T08%3A37%3A48.368Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_Revolutionizing_Industrial_Procurments_3_7adf59505a.png?updatedAt=2024-03-19T06%3A40%3A27.339Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_GLAUB_4033_bv3_2c35af10bd.jpg?updatedAt=2024-05-06T06%3A35%3A19.370Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_New_Product_Instagram_Post_500_x_500_px_1_dcf8bc9eed.png?updatedAt=2024-03-16T08%3A39%3A47.700Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
        <div>
          <Image
            src={"https://strapi.unboxindustry.com/uploads/thumbnail_Purple_Minimalist_Develop_Your_Mobile_App_With_Us_Medium_Banner_696_x_348_px_500_x_430_px_700_x_200_px_600_x_300_px_49_8bace9c327.png?updatedAt=2024-03-15T07%3A25%3A25.800Z"}
            width={400}
            height={400}
            style={{ border: "1px solid #FF8400" }}
            className="main-sliderImage1"
            alt='product'
          />
        </div>
      </Slider>



    </>



    // <div style={{width:  "500px", marginTop: "90px", }}>
    //     <div>
    //       <h3 style={{ fontSize: "20px" }}>Product Name</h3>
    //     </div>
    //     <div style={{ paddingLeft: "0", paddingTop: "4px" }}>
    //       <Image id='addImg' width={150} height={150} src="https://strapi.unboxindustry.com/uploads/UNITRE_3_removebg_preview_ef9d6cc5ce.png" alt="title" />
    //     </div>
    //     <div>
    //       <p style={{ paddingTop: "2px", fontSize: "15px" }}>Unbox Industry presents <br /> Go2 Pro by Unitree Robotics.</p>
    //     </div>
    //     <div style={{ paddingLeft: "0", paddingTop: "4px" }}>
    //       <Image id='addImg' width={150} height={150} src="https://strapi.unboxindustry.com/uploads/UNITRE_3_removebg_preview_ef9d6cc5ce.png" alt="title" />
    //     </div>
    //     <div>
    //       <p style={{ paddingTop: "2px", fontSize: "15px" }}>Unbox Industry presents <br /> Go2 Pro by Unitree Robotics.</p>
    //     </div>
    //     <div style={{ paddingLeft: "0", paddingTop: "4px" }}>
    //       <Image id='addImg' width={150} height={150} src="https://strapi.unboxindustry.com/uploads/UNITRE_3_removebg_preview_ef9d6cc5ce.png" alt="title" />
    //     </div>
    //     <div>
    //       <p style={{ paddingTop: "2px" }}>Unbox Industry presents <br /> Go2 Pro by Unitree Robotics.</p>
    //     </div>
    //   </div>

  );
};

export default LeftPopularCard;

