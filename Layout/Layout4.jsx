// import React, { useEffect, useState } from "react";
// import { fetchAPI } from "../Utils/api";
// import Cookie from "./Common/Cookie";
// import ThemeCustomizer from "./Common/Customizer";
// import Footers from "./Common/Footer";
// import Header4 from "./Common/Header/Header4";
// import TapTop from "./Common/TapTop";
// import Whatsapp from "./Whatsapp";

// const Layout4 = ({ children, isCategories }) => {
//   const [categories, setCategories] = useState(null);
//   const [brands, setBrands] = useState(null);
//   const [industries, setIndustries] = useState(null);

//   useEffect(() => {
//     fetchAPI(`/brands`, {
//       populate: "*",
//       pagination: {
//         start: 0,
//         limit: -1,
//       },
//     }).then((res) => {
//       setBrands(res.data);
//     });
//     fetchAPI("/categories", { populate: "*" }).then((res) => {
//       setCategories(res.data);
//     });
//     fetchAPI('/industrial-solutions').then((result) => {
//       setIndustries(result.data);
//     });
//   }, []);
//   const addLeft = true;
//   return (
//     <>
//       <Header4
//         isCategories={isCategories}
//         brandData={brands}
//         categories={categories}
//         industries={industries}
//       />
//       {children}
//       <TapTop />
//       <Whatsapp />
//       <Footers categories={categories} brands={brands} industries={industries} />
//     </>
//   );
// };
// export default Layout4;


// optimizing layout4 by using memoization , lazy Loading of non-critical components and conditional featching.


import React, { useEffect, useState , lazy, Suspense, useMemo} from "react";
import { fetchAPI } from "../Utils/api";
import TapTop from "./Common/TapTop";
import Whatsapp from "./Whatsapp";
//import SkeletonLoader from '../Components/Element/SkeletonLoader';
import SkeletonLoaderNav from "../Components/Element/SkeletonLoaderNav";

const Cookie =lazy(() => import('./Common/Cookie'));
const ThemeCustomizer =lazy(() => import('./Common/Customizer'));
const Footers = lazy(() => import('./Common/Footer'));
const Header4 = lazy(() => import('./Common/Header/Header4'));

const Layout4 = ({children, isCategories }) => {
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const [industries, setIndustries] = useState(null);
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  useEffect(() => {
    
      // featching categories
      fetchAPI("/categories", { populate: "categories.categories" }).then((res) => {
        setCategories(res.data);
      });

      //featching brands
      // fetchAPI("/brands", {
      //   populate: "*",
      //   pagination: {
      //     start: 0,
      //     limit: -1,
      //   },
      // }).then((res) => {
      //   setBrands(res.data);
      // }); 

     // Fetching brands
    fetch("https://strapi.unboxindustry.com/api/brands?populate[0]=brand_image", requestOptions)
    .then((response) => response.json())
    .then((result) => setBrands(result.data))
    .catch((error) => console.error("Error fetching brands:", error));


      //featch industries
      fetchAPI('/industrial-solutions').then((result) => {
        setIndustries(result.data);
      });
      
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedBrand = useMemo(() => brands, [brands]);
  const memoizedIndustries = useMemo(() => industries, [industries]);
  

    return (
      <>
        <Suspense fallback={<SkeletonLoaderNav />}>
          <Header4
            isCategories={isCategories}
            brandData={memoizedBrand}
            categories={memoizedCategories}
            industries={memoizedIndustries}
          />
        </Suspense>
        {children}
        <TapTop />
        <Whatsapp />
        <Suspense fallback={<div>Loading...</div>}>
          <Footers categories={memoizedCategories} brands={memoizedBrand} industries={memoizedIndustries} />
        </Suspense>
      </>
    );

}

export default Layout4;
