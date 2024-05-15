//import React from 'react';

import Image from 'next/image';
import * as React from 'react';
const LeftPopularCard = ({products, categories}) => {
  console.log("sidebarproducts", products);
  return (

    <div>
      <div>
        <h3 style={{ textSizeAdjust: "20px" }}>product name </h3>

      </div>
      <div style={{ paddingLeft: "-10px" }} >
        <Image width={250} height={250} src="https://strapi.unboxindustry.com/uploads/UNITRE_3_removebg_preview_ef9d6cc5ce.png" alt="title" />
      </div>
      <div>
        <p> Unbox Industrypresents Go2 Pro by Unitree Robotics.
          Go2 Pro is a multi-purpose legged platform for various R&D projects.
         
        </p>
      </div>
    </div>
    // <div className='popular-post mt-4'>
    //   <div className='popular-title'>
    //     <h3>{PopularPosts}</h3>
    //   </div>
    //   {PopularPost.map((elem, i) => {
    //     return (
    //       <div className='popular-image' key={i}>
    //         <div className='popular-number'>
    //           <h4 className='theme-color'>{elem.no}</h4>
    //         </div>
    //         <div className='popular-contain'>
    //           <h3>{elem.description}</h3>
    //           <p className='font-light mb-1'>
    //             <span>{elem.title}</span> {elem.in} <span>{elem.title1}</span>
    //           </p>
    //           <div className='review-box'>
    //             <span className='font-light clock-time'>
    //               <Clock />
    //               {elem.time}
    //             </span>
    //             <span className='font-light eye-icon'>
    //               <Eye />
    //               {elem.views}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default LeftPopularCard;
