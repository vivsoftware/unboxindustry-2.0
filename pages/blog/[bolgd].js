



import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LeftSidebar from '../../Components/Blog/BlogDetails/LeftSidebar';
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
  const [catid, setCatid] = useState(null);
  const [lastpage, setlastpage] = useState();
  const [background, setBackground] = useState();
  if (!data) {
    console.log("additional_image", data1)

    return <SkeletonLoader />;

  }





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
    categories,
  } = data.attributes;
  useEffect(() => {
    setCatid(categories.data[0].id);
    if (data.attributes.banner_image) {
      setBackground(`url(${getStrapiMedia(data.attributes.banner_image)})`);
    }
  }, [data]);
  const { metaTitle, metaDescription, metaImage, keywords, canonicalURL } = data.attributes.SEO || {};

  //changes for mapping//
  const descriptions = [Description1, Description2, Description3, Description4, Description5, Description6, Description7];
  const images = [Description1_image, Description2_image, Description3_image, Description4_image, Description5_image, Description6_image, Description7_image];
  //changes end//

  // console.log("additional_image", data.attributes.categories.dat[0].id)

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
      
      {/* //////////////Default Screen///////////// */}
      <div className='blog-page' id='blogDefault'>
        <div className='blogg-page' id= "blogDefault" style={{ backgroundImage: `url("${getStrapiMedia(banner_image)}")` }}>
        </div>
      </div>

      <div className='blog-page1'>

        <h2 className='blog-heading2'>{title}<br /></h2>

        <div className='blog-page2'>

          <h3 className='blog-heading3'>{testing1}</h3>
        </div>
        <Img className='blog-image' src={getStrapiMedia(additional_image)} alt={title} />
      </div>
      <div className='grid-container'>
        {/* First column: Descriptions */}
        <div className='description-column'> 
          {descriptions.map((description, index) => (
            <div className='description-item' key={index}>
              <span className='description-span' dangerouslySetInnerHTML={{ __html: description }}></span>
              <Img className='image-class' src={getStrapiMedia(images[index])} alt={title} />           
            </div>
          ))}
        </div>

        {/* Second column: Sidebar */}
        <div className='sidebar-container'>
          <LeftSidebar products={data1} categories={categories} />
        </div>
      </div>
      {/* //////////////Default Screen ends///////////// */}

          
      {/* /////////////////mobile view start/////////////////// */}
      {/* <div className='blog-pagemobile' id='blog-mobile'>
        <div className='blogg-pagemobile' id='blogg-mobile' style={{ backgroundImage: `url("${getStrapiMedia(banner_image)}")` }}>
        </div>
      </div>

      <div className='blog-page1mobile' id='page1-mobile'>

        <h2 className='blog-heading2mobile' id='heading2-mobile'>{title}<br /></h2>

        <div className='blog-page2mobile' id='page2-mobile'>

          <h3 className='blog-heading3mobile' id='heading3-mobile'>{testing1}</h3>
        </div>
        <Img className='blog-imagemobile' id='image-mobile' src={getStrapiMedia(additional_image)} alt={title} />
      </div> */}
      {/* First column: Descriptions */}
      {/* <div className='descriptionmobile' id='description1mobile' >
        {descriptions.map((description, index) => (
          <div key={index}>
            <span className='description-spanmobile' id='description-span1mobile' dangerouslySetInnerHTML={{ __html: description }}></span>
            <img className='image-classmobile' id='image-class1mobile' src={getStrapiMedia(images[index])} alt={title} />

            <div className='sidebarmobile' id='sidebar1mobile' >
              <LeftSidebar products={data1} categories={categories} />
            </div>
          </div>
        ))}
      </div> */}
      {/* /////////////////////mobile view end///////////// */}


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

  // Fetch data from the API endpoint for blogs
  const blogData = await fetchAPI('/blogs', {
    populate: '*',
  });

  // Check if blogData contains the necessary information
  const catid = query.catid;
  // console.log("servzzzz", blogData);
  // Fetch data from the API endpoint for products using the obtained catid

  const productData = await fetchAPI(`/categories/1`, {
    populate: {
      products: {
        populate: '*',
      }
    }
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






//       <BreadCrumb parent={''} title={''} />

//       <div className='blog-page' id='blog'>
//         <div className='blogg-page' id='blogg' style={{ backgroundImage: `url("${getStrapiMedia(banner_image)}")` }}>
//         </div>
//       </div>

//       <div className='blog-page1' id='blog1'>

//         <h2 className='blog-heading2' id='heading2'>{title}<br /></h2>

//         <div className='blog-page2' id='blog2'>

//           <h3 className='blog-heading3' id='heading3'>{testing1}</h3>
//         </div>
//         <Img className='blog-image' id='image1' src={getStrapiMedia(additional_image)} alt={title} />
//       </div>

//       {/* //////////////It is simple way but we have to write about every line////////////////// */}
//       {/* <div style={{paddingTop: "10px"}} >
//         {/* ////////////////////////Description1////////////////
//        <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description1}` }}></span> 
//        <Img style={{ marginTop: "56px", width: "570px", height: "510px", marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description1_image)} alt={title} />
       
//         {/* ////////////////////////Description2//////////////// 
//        <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description2}` }}></span> 
//        <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description2_image)} alt={title} />
       
//        {/* ////////////////////////Description3//////////////// 
//        <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description3}` }}></span>
//        <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description3_image)} alt={title} />
       
//        {/* ////////////////////////Description4//////////////// 
//        <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description4}` }}></span> 
//        <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description4_image)} alt={title} />
      
//       {/* ////////////////////////Description5//////////////// 
//        <span className='' style={{marginLeft: "350px", marginRight: "350px",textAlign: "justify", fontSize: "25px"}} dangerouslySetInnerHTML={{ __html: `${Description5}` }}></span> 
//        <Img style={{ marginTop: "56px", width: "570px", height: "510px",  marginLeft: "700px",border: "0.8px solid black" }} src={getStrapiMedia(Description5_image)} alt={title} />       
//       </div> */}
//       {/* <div className='sidebar' id='sidebar1'>
//       <LeftSidebar />
//       </div> */}
//       {/* //////////////////This is same but using map function yet simple and effective//////////// */}
//       <div className='grid-container'>
//         {/* First column: Descriptions */}
//         <div className='description-column'> 
//           {descriptions.map((description, index) => (
//             <div className='description-item' key={index}>
//               <span className='description-span' dangerouslySetInnerHTML={{ __html: description }}></span>
//               {/* <Img className='image-class' src={getStrapiMedia(images[index])} alt={title} /> */}           
           
//             </div>
//           ))}
//         </div>

//         {/* Second column: Sidebar */}
//         <div className='sidebar-container'>
//           <LeftSidebar products={data1} categories={categories} />
//         </div>
//       </div>

//       {/* /////////////////mobile view/////////////////// */}
//       {/* First column: Descriptions */}
//       <div className='description' id='description1' >
//         {descriptions.map((description, index) => (
//           <div key={index}>
//             <span className='description-span' id='description-span' dangerouslySetInnerHTML={{ __html: description }}></span>
//             <img className='image-class' id='image-class1' src={getStrapiMedia(images[index])} alt={title} />

//             <div className='sidebar' id='sidebar1' >
//               <LeftSidebar products={data1} categories={categories} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Second column: Sidebar */}
//       {/* <div className='sidebar' id='sidebar1' >
//         <LeftSidebar products={data1} categories={categories} />
//       </div> */}


//       {/* /////////////////////mobile view end///////////// */}


