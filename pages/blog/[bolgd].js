import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LeftSidebar from '../../Components/Blog/BlogDetails/LeftSidebar';
import Img from '../../Components/Element/Images';
import SkeletonLoader from '../../Components/Element/SkeletonLoader';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../../Layout/Layout4';
import Enquire from '../layout/Enquire';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media';
import { CommonPath } from '../../Components/Constant';

const Blogd = (props) => {
  const router = useRouter();
  const id = parseInt(router.query.bolgd);
  const data = props.allBlogs.data?.find((item) => item.id === id);
  const data1 = props.allProducts.data;

  const [catid, setCatid] = useState(null);
  const [background, setBackground] = useState();

  const sidebarRef = useRef(null);
  const descriptionColumnRef = useRef(null);
  const endFormRef = useRef(null);

  if (!data) {
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

  const descriptions = [Description1, Description2, Description3, Description4, Description5, Description6, Description7];
  const images = [Description1_image, Description2_image, Description3_image, Description4_image, Description5_image, Description6_image, Description7_image];

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = sidebarRef.current;
      const descriptionColumn = descriptionColumnRef.current;
      const endForm = endFormRef.current;

      if (!sidebar || !descriptionColumn || !endForm) return;

      const descriptionItems = descriptionColumn.querySelectorAll('.description-item');
      if (descriptionItems.length === 0) return;

      const firstDescriptionItem = descriptionItems[0];
      const lastDescriptionItem = descriptionItems[descriptionItems.length - 1];

      const sidebarRect = sidebar.getBoundingClientRect();
      const firstItemRect = firstDescriptionItem.getBoundingClientRect();
      const lastItemRect = lastDescriptionItem.getBoundingClientRect();
      const endFormRect = endForm.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      if (firstItemRect.top < 0 && endFormRect.bottom > sidebarRect.height) {
        sidebar.classList.add('sidebar-fixed');
      } 
      else if (lastItemRect.bottom > 0 && endFormRect.bottom < sidebarRect.height) {
        sidebar.classList.add('sidebar-fixed');
      }
      
      else {
        sidebar.classList.remove('sidebar-fixed');
      }

      if (lastItemRect.bottom <= windowHeight) {
        sidebar.style.top = `${windowHeight - lastItemRect.bottom}px`;
      } else {
        sidebar.style.top = '0px';
      }

      if (endFormRect.top < windowHeight) {
        sidebar.classList.remove('sidebar-fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      <div className='blog-page' id='blogDefault'>
        <div className='blogg-page' id="blogDefault" style={{ backgroundImage: `url("${getStrapiMedia(banner_image)}")` }}>
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
        <div className='description-column' ref={descriptionColumnRef}>
          {descriptions.map((description, index) => (
            <div className='description-item' key={index}>
              <span className='description-span' dangerouslySetInnerHTML={{ __html: description }}></span>
              <Img className='image-class' src={getStrapiMedia(images[index])} alt={title} />
            </div>
          ))}
        </div>

        <div className='sidebar-container' id="sidebar-mobile" ref={sidebarRef}>
          <LeftSidebar products={data1} categories={categories} endFormRef={endFormRef} />
        </div>
      </div>

      <div className='endfrom' ref={endFormRef}>
        <Enquire />
      </div>
      <FlowerSubscribe />
      
    </Layout4>
  );
};

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ query, locale }) {
  const page = parseInt(query.page) || 0;
  const start = page * 20;

  const blogData = await fetchAPI('/blogs', {
    populate: '*',
  });

  const catid = query.catid;
  const productData = await fetchAPI(`/categories/1`, {
    populate: {
      products: {
        populate: '*',
      }
    }
  });

  return {
    props: {
      allProducts: productData,
      allBlogs: blogData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Blogd;

