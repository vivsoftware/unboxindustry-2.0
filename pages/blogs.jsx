import Head from 'next/head';
import React from 'react';
import BlogNoSidebarContain from './layout/Blog';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../Layout/Layout4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Enquire from './layout/Enquire';
import PaginationSidebar from '../Components/Blog/BlogNoSider/PaginationSidebar';


export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const BlogNoSidebar = () => {
  return (
    <Layout4>
      <Head>
      <title>Blogs - Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`}alt="unboxLogo" />
        <link rel="canonical" href="https://www.unboxindustry.com/blogs" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Blogs</h1>
      <BlogNoSidebarContain />
      <Enquire/>
      <FlowerSubscribe />
      <PaginationSidebar/>
    </Layout4>
  );
};

export default BlogNoSidebar;
