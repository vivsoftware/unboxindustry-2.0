// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import React from 'react';
// import { CommonPath } from '../../Components/Constant';
// import BreadCrumb from '../../Components/Element/BreadCrumb';
// import Img from '../../Components/Element/Images';
// import SkeletonLoader from '../../Components/Element/SkeletonLoader';
// import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
// import Layout4 from '../../Layout/Layout4';
// import { fetchAPI } from '../../Utils/api';
// import { getStrapiMedia } from '../../Utils/media';
// import Enquire from '../layout/Enquire';

// const Blogd = (props) => {
//   const router = useRouter();
//   const id = parseInt(router.query.bolgd);
//   const data = props.alltopic.data.find((item) => item.id === id);

//   if (!data) {
//     return <SkeletonLoader />;
//   }

//   const {
//     banner_image,
//     additional_image,
//     description,
//     additional_description,
//     title,
//     date,
//   } = data.attributes;

//   const { metaTitle, metaDescription, metaImage, keywords, canonicalURL } = data.attributes.SEO || {};
//   return (
//     <Layout4>
//       <Head>
//       <title>{title}</title>
//         <meta name='viewport' content='width=device-width, initial-scale=1' />
//         <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />

//         {/* {metaTitle && (
//           <> */}
//             <meta name="description" content={metaDescription || ''} />
//             <meta property="title" content={metaTitle || ''} />
//             <meta property="keywords" content={keywords || ''} />
//             <meta property="image" content={metaImage || ''} />
//             <meta property="canonicalURL" content={canonicalURL || ''} />
//           {/* </>
//         )} */}
//       </Head>
//       <BreadCrumb parent={''} title={''} />
//       <div className='container'>
//       <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Blog</h1>
//         <section className='masonary-blog-section'>
//           <div className='blog-image-box'>
//             <Img src={getStrapiMedia(banner_image)} className='card-img-top mt-2' alt={title} />
//             <div className='bolgD'>
//             <span  dangerouslySetInnerHTML={{ __html: `${description}` }}></span>

//             </div>
//             {additional_image.data === null ? (
//               <p></p>
//             ) : (
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <Img src={getStrapiMedia(additional_image)} alt={title} />
//               </div>

//             )}
//             {additional_description === null ? (
//               <p></p>
//             ) : (
//               <span className='blog-para mt-3' style={{ lineHeight: '23px' }} dangerouslySetInnerHTML={{ __html: `${additional_description}` }}></span>
//             )}

//           </div>
//           {/* <CommentDetails /> */}
//           <Enquire />
//         </section>
//       </div>
//       <FlowerSubscribe />
//     </Layout4>
//   );
// };

// export async function getServerSideProps() {

//   const data = await fetchAPI(`/blogs`, {
//     populate: '*',
//   });
//   let alltopic = await data;
//   return {
//     props: { alltopic: alltopic },
//   };
// }

// export default Blogd;

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import Img from '../../Components/Element/Images';
import SkeletonLoader from '../../Components/Element/SkeletonLoader';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../../Layout/Layout4';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media';
import Enquire from '../layout/Enquire';

const Blogd = (props) => {
  const router = useRouter();
  const id = parseInt(router.query.bolgd);
  const data = props.allBlogs.data?.find((item) => item.id === id);
  const data1 = props.allProducts.data
  const [products, setproducts] = useState();
  const [lastpage, setlastpage] = useState();
  const [background, setBackground] = useState();
  if (!data) {
    console.log("additional_image", data1)

    return <SkeletonLoader />;

  }

  useEffect(() => {
    if (data.attributes.banner_image) {
      setBackground(`url(${getStrapiMedia(data.attributes.banner_image)})`);
    }
  }, [data]);

  // const style = {
  //   backgroundColor: "#ffffff",
  //   //backgroundImage: background,
  //   // backgroundRepeat: "no-repeat",
  //   // backgroundSize: "1910px 700px",
  //   // height: "700px",
  //   //    paddingTop: "20px",
  //   //    marginTop: "20px",
  // }

  // const style1 = {
  //   backgroundColor: "white",
  //   width: "1900px",
  //   height: "1000px",
  //   backgroundSize: "1900px 900px",
  // }

  // const style2 = {
  //   backgroundColor: "#ff8400",
  //   width: "1900px",
  //   height: "550px",
  //   marginTop: "150px",
  //   display: "flex",
  //   //backgroundSize: "1900px 900px",
  // }

  const {
    banner_image,
    additional_image,
    description,
    additional_description,
    testing1,
    title,
    Description1,
    Description1_image,
    Description2,
    Description2_image,
    Description3,
    Description3_image,
    Description4,
    Description4_image,
    Description5,
    Description5_image,
    Description6,
    Description6_image,
    Description7,
    Description7_image,
    Description8,
    Description8_image,
    Description9,
    Description9_image,
    Description10,
    Description10_image,
    date,
  } = data.attributes;

  const { metaTitle, metaDescription, metaImage, keywords, canonicalURL } = data.attributes.SEO || {};
  //changes for mapping//
  const descriptions = [Description1, Description2, Description3, Description4, Description5, Description6, Description7];
  const images = [Description1_image, Description2_image, Description3_image, Description4_image, Description5_image, Description6_image, Description7_image];
  //changes end//
  // console.log("additional_image", data)
  // console.log("bg_image", background);
  return (
    <Layout4>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
        <meta name="description" content={metaDescription || ''} />
        <meta property="title" content={metaTitle || ''} />
        <meta property="keywords" content={keywords || ''} />
        <meta property="image" content={metaImage || ''} />
        <meta property="canonicalURL" content={canonicalURL || ''} />
      </Head>
      <BreadCrumb parent={''} title={''} />

      <div className='blog-page' id='blog'>
        <div className='blogg-page' id='blogg' style={{ backgroundImage: `url("${getStrapiMedia(banner_image)}")` }}>
        </div>
      </div>

      <div className='blog-page1' id='blog1'>

        <h2 className='blog-heading2'>{title}<br /></h2>

        <div className='blog-page2' id='blog2'>
          <h3 className='blog-heading3' id='heading1'>{testing1}</h3>
        </div>
        <Img className='blog-image' id='image1' src={getStrapiMedia(additional_image)} alt={title} />
      </div>

      {/* //////////////It is simple way but we have to write about every line////////////////// */}
      {/* <div style={{paddingTop: "10px"}} >
        {/* ////////////////////////Description1////////////////
       <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description1}` }}></span> 
       <Img style={{ marginTop: "56px", width: "570px", height: "510px", marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description1_image)} alt={title} />
       
        {/* ////////////////////////Description2//////////////// 
       <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description2}` }}></span> 
       <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description2_image)} alt={title} />
       
       {/* ////////////////////////Description3//////////////// 
       <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description3}` }}></span>
       <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description3_image)} alt={title} />
       
       {/* ////////////////////////Description4//////////////// 
       <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description4}` }}></span> 
       <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description4_image)} alt={title} />
      
      {/* ////////////////////////Description5//////////////// 
       <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description5}` }}></span> 
       <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description5_image)} alt={title} />       
      </div> */}

      {/* //////////////////This is same but using map function yet simple and effective//////////// */}
      <div className='description' id='description1' style={{ paddingTop: "10px" }}>
        {descriptions.map((description, index) => (
          <div key={index}>
            {/* For the Description */}
            <span className='description-span' id='description-span1' dangerouslySetInnerHTML={{ __html: description }}></span>

            {/* For the Image */}
            <Img className='image-class' id='description-image1' src={getStrapiMedia(images[index])} alt={title} />
          </div>
        ))}
      </div>

      <Enquire />
      <FlowerSubscribe />
    </Layout4 >
  );
};


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ query, locale }) {
  const page = parseInt(query.page) || 0; // Get the page from the query parameters
  // Calculate the start index based on the page and limit
  const start = page * 20;

  // Fetch data from the API endpoint for products
  const productData = await fetchAPI('/products', {
    populate: '*',
    revalidate: 60,
    pagination: {
      start: 0,
      limit: 20, // Limit adjusted to 20 based on the calculation
    },
  });

  // Fetch data from the API endpoint for blogs
  const blogData = await fetchAPI('/blogs', {
    populate: '*',
  });

  // Return the props object with fetched data and translations
  return {
    props: {
      allProducts: productData,
      allBlogs: blogData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Blogd;




