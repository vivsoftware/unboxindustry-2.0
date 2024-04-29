import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import Layout4 from '../../Layout/Layout4';
import { fetchAPI } from '../../Utils/api';
import Head from 'next/head';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import ShopLeftSidebarContain from '../layout/Shop';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import CanvasOffset from '../../Components/Shop/ShopCanvasFilter/CanvasOffset';
import { getAPIData } from '../../Utils';
import Enquire from '../layout/Enquire';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const productByBrands = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setsHOW] = useState([false]);
  const [currentPage, setCurrentPage] = useState(-1);
  const handleLoadMore = async () => {
    setsHOW(true);
    // const nextPage = 0++;
    const nextPage = currentPage + 1;
    router.push(`/category?page=${nextPage}`);
    setCurrentPage(nextPage + 1)
  };
  const handleLoadless = async () => {
    const nextPage = currentPage - 1;
    router.push(`/category?page=${nextPage}`);
    setCurrentPage(nextPage - 1)
  };
  useEffect(()=>{
    const types = ['products'];
    types.map((type) => {
    getAPIData(`${process.env.API_URL}${type}`).then((res) => {
        type === 'products' && setProductData(res?.data);
    });
    });
    slug && fetchAPI(`/categories/${slug}`,{
        populate: {
          products: {
            populate: '*',
          }
      }
    }).then((res)=>{
        setProducts(res.data.attributes.products?.data)
    })
},[router])
  return (
    <Layout4>
      <Head>
        <title>{props.seoData?.data.attributes.category_name}</title>
        {props.seoData?.data.attributes?.SEO && (
          <>
            <meta name="description" content={props.seoData?.data.attributes?.metaDescription} />
            <meta property="title" content={props.seoData?.data.attributes?.metaTitle} />
             <meta property="image" content={props.seoData?.data.attributes?.metaImage} />
            <meta property="keywords" content={props.seoData?.data.attributes?.keywords} />
            <meta property="canonicalURL" content={props.seoData?.data.attributes?.canonicalURL} /> 
          </>
        )}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>All Products</h1>
      <ShopLeftSidebarContain productData={productData} products={products} show={show} />
      <Enquire />
      <FlowerSubscribe />
      <CanvasOffset productData={productData} products={products} />
    </Layout4>
  )
}
export async function getServerSideProps(context) {
  // Extract the id parameter from the context
  const { slug } = context.query;
  const numbersArray = slug.match(/\d+/g);
        // setbrandproducts(numbersArray.map(Number))
        const numbers = numbersArray.map(Number);
  const brandData = await fetchAPI(`/categories/${numbers}`, {
    populate: '*',
    pagination: {
      start: 0,
      limit: -1,
    },
  });
  // Replace 'locale' with the appropriate locale variable
  const locale = 'en'; // Change this to your desired locale
  return {
    props: {
      // alltopic: data,
      seoData: brandData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default productByBrands;
