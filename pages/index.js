"use client";
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import Categories from '../Components/ElectronicDemo/Categories';
import CategorizedProducts from '../Components/ElectronicDemo/Category/categorizedProducts';
import Customers from '../Components/ElectronicDemo/Customers';
import ElectronicCollection from '../Components/ElectronicDemo/ElectronicCollection';
import ElectronicHomeSlider from '../Components/ElectronicDemo/ElectronicHomeSlider';
import ElectronicHurryUp from '../Components/ElectronicDemo/ElectronicHurryUp';
import ElectronicInstagramShop from '../Components/ElectronicDemo/ElectronicInstagramShop';
import ElectronicTopBanner from '../Components/ElectronicDemo/ElectronicTopBanner';
import SkeletonLoader from '../Components/Element/SkeletonLoader';
import FashionService from "../Components/FashionDemo/FashionService";
import Brand from '../Components/FlowerDemo/BrandSlider';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import { auth } from '../Config/firebase';
import Layout4 from '../Layout/Layout4';
import { fetchAPI } from '../Utils/api';
import { getStrapiMedia } from '../Utils/media';
import spring_boot_url from '../Utils/springApi';
import Enquire from './layout/Enquire';
import useIntersectionObserver from './useIntersectionObserver';

const cache = {};

export const getServerSideProps = async ({ locale }) => {
  const cachedData = cache['homepage_data'];
  if (cachedData) {
    return {
      props: {
        data: cachedData,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
  const data = await fetchAPI('/homepage', {
    populate: '*',
  });
  cache['homepage_data'] = data;
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

function Home(props) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [userDe, setuserDe] = useState(null);
  const [showStartModel, setShowStartModel] = useState(false);
  const [camera, setCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dealsoftheday, setdealsoftheday] = useState(true);
  const [newarrivals, setnewarrivals] = useState(true);
  const [cobot, setcobot] = useState(true);

  const [homeSliderRef, homeSliderInView, homeSliderLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [topBannerRef, topBannerInView, topBannerLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [collectionRef, collectionInView, collectionLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [categoriesRef, categoriesInView, categoriesLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [hurryUpRef, hurryUpInView, hurryUpLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [instagramShopRef, instagramShopInView, instagramShopLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [customersRef, customersInView, customersLoaded] = useIntersectionObserver({ threshold: 0.1 });
  const [brandRef, brandInView, brandLoaded] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await fetchAPI('/homepage', { populate: '*' });
        setData(homeData.data.attributes);

        const dealsDataPromise = fetchAPI('/dealsofthedays', { populate: '*', pagination: { limit: -1 } });
        const categoryDataPromise = fetch("https://strapi.unboxindustry.com/api/categories?populate[0]=category_icon", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const [dealsData, categoryResponse] = await Promise.all([dealsDataPromise, categoryDataPromise]);
        const categoryData = await categoryResponse.json();

        setdealsoftheday(dealsData.data);
        setCategory(categoryData.data);

        auth.onAuthStateChanged(async (user) => {
          setUser(user);
          if (user && user.email) {
            try {
              const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
              setuserDe(response.data);

              connection.on('connect', () => {
                console.log("connected to database");
              });
              connection.on('error', () => {
                console.log("error in connection database", err);
              });
            } catch (error) {
              console.error(error);
            }
          } else if (user && user.phoneNumber) {
            let phoneNumberd = user.phoneNumber;
            phoneNumberd = phoneNumberd.replace(/\+/g, "");
            axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
              .then(resp => {
                localStorage.setItem("data", JSON.stringify(resp.data));
                setuserDe(resp.data);
              });
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.log("error loc- index.js", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isRefreshing = performance.navigation.type === 1;
    if (isRefreshing && userDe === null) {
      setTimeout(() => {
        setShowStartModel(true);
      }, 10000);
    } else if (!isRefreshing && userDe === null) {
      setShowStartModel(true);
    }
  }, [userDe]);

  const memoizedData = useMemo(() => data, [data]);
  const removePadding = true;

  if (!memoizedData) {
    return (
      <Layout4 className="home-page">
        <Head>
          <title>Industrial Automation Products And Solutions - Home</title>
          <meta name="description" content="Unbox Industry offers automation products and solutions with high performance and reliability including drives, control systems, industrial robots & cobots." />
          <meta name="keywords" content="industrial automation, industrial automation products, industrial robots & cobots, industrial grippers and sensors, cameras and industrial robot protective covers" />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="icon" href="/Box.ico" alt="unboxLogo" />
        </Head>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className='text-center'>
            <Image src="/Logofinal.svg" alt="unboxLogo" width={200} height={64} className="mobile-logo" />
            <p style={{ marginLeft: "20px" }}>Please Wait.....</p>
          </div>
        </div>
        <Enquire />
        <FlowerSubscribe />
      </Layout4>
    );
  }

  return (
    <Layout4 className="home-page">
      <Head>
        <title>Industrial Automation Products And Solutions - Unbox Industry</title>
        <meta name="description" content="Unbox Industry offers automation products and solutions with high performance and reliability including drives, control systems, industrial robots & cobots." />
        <meta name="keywords" content="industrial automation, industrial automation products, industrial robots & cobots, industrial grippers and sensors, cameras and industrial robot protective covers" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/Box.ico" alt="unboxLogo" />
        <link rel="canonical" href="https://www.unboxindustry.com" />
      </Head>
      <div className='d-none d-xl-block d-md-block d-sm-none' ref={homeSliderRef}>
        {(homeSliderInView || homeSliderLoaded) ? <ElectronicHomeSlider mainSlider={data?.hero_slider} /> : <SkeletonLoader />}
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block slider-container ms-2 me-2'>
        <Slider autoplay='true' pauseOnHover='false' indicators='false' arrows='false' prevIcon={null} nextIcon={null}>
          {data?.mobileBanner?.map((banner) => (
            <img src={getStrapiMedia(banner)} style={{ maxWidth: '100%', height: 'auto' }} alt='mobile banners' />
          ))}
        </Slider>
      </div>
      <div ref={topBannerRef}>
        {(topBannerInView || topBannerLoaded) ? <ElectronicTopBanner bannerData={data?.featured_section} /> : <SkeletonLoader />}
      </div>
      <FashionService removePadding={removePadding} />
      <div ref={collectionRef}>
        {(collectionInView || collectionLoaded) ? <ElectronicCollection productData={dealsoftheday} /> : <SkeletonLoader />}
      </div>
      <div ref={categoriesRef}>
        {(categoriesInView || categoriesLoaded) ? <Categories category={category} /> : <SkeletonLoader />}
      </div>
      <div ref={hurryUpRef}>
        {(hurryUpInView || hurryUpLoaded) ? <ElectronicHurryUp newtabsection={data} /> : <SkeletonLoader />}
      </div>
      <div ref={instagramShopRef}>
        {(instagramShopInView || instagramShopLoaded) ? <ElectronicInstagramShop /> : <SkeletonLoader />}
      </div>
      <div ref={customersRef}>
        {(customersInView || customersLoaded) ? <Customers /> : <SkeletonLoader />}
      </div>

      <div ref={instagramShopRef}>
        {(instagramShopInView || instagramShopLoaded) ? <   CategorizedProducts
        /> : <SkeletonLoader />}
      </div>


      <div ref={brandRef}>
        {(brandInView || brandLoaded) ? <Brand /> : <SkeletonLoader />}
      </div>
      <Enquire />
      <FlowerSubscribe />
    </Layout4>
  );
}

export default Home;
