// const Link = require('next/link');
// const React = require('react');
// const { lazy,Fragment, Suspense, useState, useEffect } = React;
// const { useSelector } = require('react-redux');
// const Slider = require('react-slick');
// const { auth } = require('../../../Config/firebase');
// const { ElectronicProductSlider } = require('../../../Data/SliderSettingsData');
// const { getStrapiMedia } = require('../../../Utils/media');
// const SkeletonLoader = require('../../Element/SkeletonLoader');
// const PropTypes = require('prop-types');

// const LazyImg = lazy(() => import('next/image'));

// const ProductCard = ({ ProductFilter }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { initialGrid } = useSelector((state) => state.AllGridReducer);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       console.log("user", user);
//     });
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
//   let i = 0;
//   const numberWithCommas = (x) => {
//     return x.toLocaleString("en-IN");
//   };

//   const formatPrice = (price) => {
//     return `${numberWithCommas(price)}`;
//   }

//    // Check if ProductFilter is an array before mapping
//    if (!Array.isArray(ProductFilter)) {
//     console.error('ProductFilter is not an array');
//     return null; // or return an appropriate message or component
//   }

//   return (
//     <div className={`product-wrapper slide-6`}>
//       <Slider {...ElectronicProductSlider}>
//         {ProductFilter?.map((elem, j) => {
//           // if (elem.attributes?.dealsoftheday?.data?.attributes?.name === 'Deals' && i < 12) {
//             if (elem.attributes.name) {

//             i++;
//             return (
//               <Fragment key={j}>
//                 <div className='product-box'>
//                   <div className='img-wrapper'>
//                     <Link href={`/product/${elem.attributes.product_id}-${elem.attributes.products.data[0].attributes.product_slug}`}>
//                       <div className={`front`}>
//                         {isLoading ? (
//                           <SkeletonLoader />
//                         ) : (
//                           <Suspense fallback={<div>Loading....</div>}>

//                           <LazyImg
//                             src={getStrapiMedia(elem.attributes.image)}
//                             width={200}
//                             height={200}
//                             className='bg-img'
//                             alt={elem.attributes.product_name}
//                           />
//                           </Suspense>
//                         )}
//                       </div>
//                     </Link>
// {/* 
//                     <div className='cart-wrap'>
//                       <ul>
//                         <AddToCartProduct elem={elem} />
//                         <ModelViewProduct elem={elem} />
//                         <CompareProducts elem={elem} />
//                         <AddToWishList elem={elem} />
//                       </ul>
//                     </div> */}
//                   </div>
//                   <div className='product-details text-center'>
//                     {user ? (
//                       <h3 className='theme-color fw-6-1'>
//                         {symbol}
//                         {formatPrice(elem.attributes.products.data[0].attributes.product_price * currencyValue.toFixed(2))}
//                       </h3>
//                     ) : (
//                       <Link legacyBehavior href='/login'>
//                         <h3 className='price-detail' style={{ color: '#FF8400' }}>
//                           Please Login for Price
//                         </h3>
//                       </Link>
//                     )}
//                     <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`} className='font-default fw-6-1'>
//                       <h5>{elem.attributes.products.data[0].attributes.product_name}</h5>
//                     </Link>
//                   </div>
//                 </div>
//               </Fragment>
//             );
//           } else {
//             return null;
//           }
//         })}
//       </Slider>
//     </div>
//   );
// };

// ProductCard.propTypes = {
//   ProductFilter: PropTypes.arrayOf(PropTypes.object)
// };
// export default ProductCard;

import React, { lazy, Fragment, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { auth } from "../../../Config/firebase";
import { ElectronicProductSlider } from "../../../Data/SliderSettingsData";
import { getStrapiMedia } from "../../../Utils/media";
import SkeletonLoader from "../../Element/SkeletonLoader";
import PropTypes from "prop-types";
import Link from "next/link"; // Import Link using ES6 import syntax
import ImageSkeletonLoader from "../../Element/SkeletonLoaderCat";

const LazyImg = lazy(() => import("next/image"));

const ProductCard = ({ ProductFilter }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { initialGrid } = useSelector((state) => state.AllGridReducer);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log("user", user);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => unsubscribe();
  }, []);

  const { symbol, currencyValue } = useSelector(
    (state) => state.CurrencyReducer
  );
  let i = 0;
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  if (!Array.isArray(ProductFilter)) {
    console.error("ProductFilter is not an array");
    return null;
  }

  return (
    <div className={`product-wrapper slide-6`}>
      <Slider {...ElectronicProductSlider}>
        {ProductFilter?.map((elem, j) => {
          if (elem.attributes.name) {
            i++;
            return (
              <Fragment key={j}>
                <div className="product-box">
                  <div className="img-wrapper">
                    <Link
                      href={`/product/${elem.attributes.product_id}-${elem.attributes.products.data[0].attributes.product_slug}`}
                    >
                      <div className={`front`}>
                        {isLoading ? (
                          <SkeletonLoader />
                        ) : (
                          <Suspense fallback={<ImageSkeletonLoader />}>
                            <LazyImg
                              src={getStrapiMedia(elem.attributes.image)}
                              width={200}
                              height={200}
                              className="bg-img"
                              alt={elem.attributes.product_name}
                            />
                          </Suspense>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className="product-details text-center">
                    {user ? (
                      <h3 className="theme-color fw-6-1">
                        {symbol}
                        {formatPrice(
                          elem.attributes.products.data[0].attributes
                            .product_price * currencyValue.toFixed(2)
                        )}
                      </h3>
                    ) : (
                      <Link legacyBehavior href="/login">
                        <h3
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h3>
                      </Link>
                    )}
                    <Link
                      href={`/product/${elem.id}-${elem.attributes.product_slug}`}
                      className="font-default fw-6-1"
                    >
                      <h5>
                        {elem.attributes.products.data[0].attributes.product_name}
                      </h5>
                    </Link>
                  </div>
                </div>
              </Fragment>
            );
          } else {
            return null;
          }
        })}
      </Slider>
    </div>
  );
};

ProductCard.propTypes = {
  ProductFilter: PropTypes.arrayOf(PropTypes.object),
};

export default ProductCard;


