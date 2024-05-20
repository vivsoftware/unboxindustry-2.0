
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { PopularPost } from '../../../Data/BlogData';
import Carousel from 'react-bootstrap/Carousel';
import { Slide } from 'react-slideshow-image';



const LeftPopularCard = ({ products, categories }) => {
const data =[]
  
console.log("PopularPost", products);

  return (
    <>
    <Carousel className='home-page1' style={{position: "relative", width: "300px", overflow: "hidden" }} indicators={true} prevIcon={null} nextIcon={null}>
      {PopularPost?.map((url, index) => (
        <Carousel.Item key={index} interval={1000}>
            <Image 
              src={url.image}
              width={150}
              height={170}
              // style={{border: "0.5px solid black"}}
              className="main-sliderImage1"
              alt='product'
            />
            <p>{url.description}</p>
             <Image 
              src={url.image}
              width={150}
              height={150}
              // style={{border: "0.5px solid black"}}
              className="main-sliderImage1"
              alt='product'
            />
            <p>{url.description}</p>
             <Image 
              src={url.image}
              width={150}
              height={150}
              // style={{border: "0.5px solid black"}}
              className="main-sliderImage1"
              alt='product'
            />
            <p>{url.description}</p>
            <Image 
              src={url.image}
              width={150}
              height={150}
              // style={{border: "0.5px solid black"}}
              className="main-sliderImage1"
              alt='product'
            />
            <p>{url.description}</p>
          
        </Carousel.Item>
      ))}
    </Carousel>
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

