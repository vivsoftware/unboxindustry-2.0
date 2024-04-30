import React, { Suspense, lazy, useEffect, useState } from "react";
import { fetchAPI } from "../Utils/api";
import TapTop from "./Common/TapTop";
import Whatsapp from "./Whatsapp";

const ThemeCustomizer = lazy(() => import('./Common/Customizer'));
const LazyFooter = lazy(() => import('./Common/Footer'));
const LazyHeader4 = lazy(() => import('./Common/Header/Header4'));



const Layout4 = ({ children, isCategories }) => {
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const [industries, setIndustries] = useState(null);

  useEffect(() => {

    // fetchAPI(`/brands`, {
    //   populate: "*",
    //   pagination: {
    //     start: 0,
    //     limit: -1,
    //   },
    // }).then((res) => {
    //   setBrands(res.data);
    // });
    // fetchAPI("/categories", { populate: "*" }).then((res) => {
    //   setCategories(res.data);
    // });
    // fetchAPI('/industrial-solutions').then((result) => {
    //   setIndustries(result.data);
    // });
    const fetchData = async () => {
      const categoriesData = await fetchAPI("/categories", {populate: "*"});
      setCategories(categoriesData.data);

      const brandsData = await fetchAPI("/brands", {
        populate: "*",
        pagination: {
          start: 0,
          limit: -1,
        },
      });
      setBrands(brandsData.data);

      const industriesData = await fetchAPI('/industrial-solutions');
      setIndustries(industriesData.data);
    };

    fetchData();
  }, []);

  const addLeft = true;
  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>
      <LazyHeader4
        isCategories={isCategories}
        brandData={brands}
        categories={categories}
        industries={industries}
      />
      </Suspense>
      {children}
      <TapTop />
      <Whatsapp />
      <Suspense fallback={<div>Loading....</div>}>
        <LazyFooter 
          categories={categories}
          brands={brands}
          industries={industries}
        />
      </Suspense>
     
    </>
  );
};
export default Layout4;
