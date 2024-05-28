import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { getStrapiMedia } from "../../../Utils/media";
import Link from "next/link";
import { useSelector } from "react-redux";
import SkeletonLoader from "../../Element/SkeletonLoader";
import { auth } from "../../../Config/firebase";
import Image from "next/image";
import { fetchAPI } from "../../../Utils/api";

const useFetchProducts = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = ['cobots', 'sensors', 'grippers', 'safeties', 'industrial-robots', 'mobile-robots'];
        const productPromises = categories.map(category => 
          fetchAPI(`/${category}`, { populate: "*", pagination: { limit: -1 } })
        );

        const results = await Promise.all(productPromises);
        const productsData = categories.reduce((acc, category, index) => {
          acc[category] = results[index];
          return acc;
        }, {});
        setProducts(productsData);
      } catch (error) {
        console.log("error in fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading };
};

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return user;
}

const ProductList = memo(({ title, items, isVideo, videoSrc, isLoading, user, symbol, formatPrice, currencyValue, videoRef }) => {
  const hasItems = items && items.data && items.data.length > 0;

  return (
    <>
      <h2 className="text-center mb-3" style={{ margin: "40px" }}>{title}</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", backgroundColor: "#eee" }}>
        <div className="row">
          {isVideo && hasItems && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link href={`/category/${items.data[0]?.attributes?.category?.data?.id}-${items.data[0]?.attributes?.category_name}`}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  style={{ objectFit: "cover", width: "300px", height: "705px", marginLeft: "-15px" }}
                >
                  <source src={getStrapiMedia(videoSrc)} type="video/mp4" />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12">
            <div className="row">
              {hasItems ? items.data.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}>
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px", borderBottom: '1px solid black' }}
                        className="sensor-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>{el.attributes.product.data.attributes.product_name}</h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price === "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(el.attributes.product.data.attributes.product_price * currencyValue.toFixed(2))}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5 className="price-detail" style={{ color: "#FF8400" }}>Please Login for Price</h5>
                      </Link>
                    )}
                  </Link>
                </div>
              )) : (
                <div>No products available</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block">
        <div className="row" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", backgroundColor: "#eee", marginLeft: '5px', marginRight: '5px' }}>
          {isVideo && hasItems && (
            <div className="col-12" style={{ padding: '0' }}>
              <Link href={`/category/${items.data[0]?.attributes?.category?.data?.id}-${items.data[0]?.attributes?.category_name}`}>
                <img
                  src={getStrapiMedia(items.data[0].attributes.mobile_banner)}
                  style={{ objectFit: 'cover', width: '100%' }}
                  alt={title}
                />
              </Link>
            </div>
          )}
          <div className="row">
            {hasItems ? items.data.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}>
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px", borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>{el.attributes.product.data.attributes.product_name}</h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price === "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(el.attributes.product.data.attributes.product_price * currencyValue.toFixed(2))}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5 className="price-detail" style={{ color: "#FF8400" }}>Please Login for Price</h5>
                    </Link>
                  )}
                </Link>
              </div>
            )) : (
              <div>No products available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

const CategorizedProducts = () => {
  const { products, loading } = useFetchProducts();
  const user = useAuth();
  const videoRef = useRef(null);

  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

  const numberWithCommas = useCallback((x) => x.toLocaleString("en-IN"), []);
  const formatPrice = useCallback((price) => `${numberWithCommas(price)}`, [numberWithCommas]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error("Autoplay was blocked:", error));
    }
  }, [videoRef]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <ProductList title="Cobots" items={products.cobots} isVideo videoSrc={products.cobots?.data?.[0]?.attributes?.category_banner} isLoading={loading} user={user} symbol={symbol} formatPrice={formatPrice} currencyValue={currencyValue} videoRef={videoRef} />
      <ProductList title="Sensors" items={products.sensors} isVideo videoSrc={products.sensors?.data?.[0]?.attributes?.category_banner} isLoading={loading} user={user} symbol={symbol} formatPrice={formatPrice} currencyValue={currencyValue} videoRef={videoRef} />
      <ProductList title="Grippers" items={products.grippers} isVideo videoSrc={products.grippers?.data?.[0]?.attributes?.category_banner} isLoading={loading} user={user} symbol={symbol} formatPrice={formatPrice} currencyValue={currencyValue} videoRef={videoRef} />
      <ProductList title="Safety" items={products.safeties} isVideo videoSrc={products.safeties?.data?.[0]?.attributes?.category_banner} isLoading={loading} user={user} symbol={symbol} formatPrice={formatPrice} currencyValue={currencyValue} videoRef={videoRef} />
      <ProductList title="Industrial Robots" items={products["industrial-robots"]} isVideo videoSrc={products["industrial-robots"]?.data?.[0]?.attributes?.category_banner} isLoading={loading} user={user} symbol={symbol} formatPrice={formatPrice} currencyValue={currencyValue} videoRef={videoRef} />
      <ProductList title="Mobile Robots" items={products["mobile-robots"]} isVideo videoSrc={products["mobile-robots"]?.data?.[0]?.attributes?.category_banner} isLoading={loading} user={user} symbol={symbol} formatPrice={formatPrice} currencyValue={currencyValue} videoRef={videoRef} />
    </div>
  );
};

export default CategorizedProducts;

  


// const CategorizedProducts = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const videoRef = useRef(null);
//   const [products, setProducts] = useState({
//     cobot: [],
//     sensor: [],
//     gripper: [],
//     safety: [],
//     industrialRobot: [],
//     mobileRobot: [],
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const [cobot, sensor, gripper, safety, industrialRobot, mobileRobot] = await Promise.all([
//           fetchAPI(`/cobots`, { populate: "*", pagination: { limit: -1 } }),
//           fetchAPI(`/sensors`, { populate: "*", pagination: { limit: -1 } }),
//           fetchAPI(`/grippers`, { populate: "*", pagination: { limit: -1 } }),
//           fetchAPI(`/safeties`, { populate: "*", pagination: { limit: -1 } }),
//           fetchAPI(`/industrial-robots`, { populate: "*", pagination: { limit: -1 } }),
//           fetchAPI(`/mobile-robots`, { populate: "*", pagination: { limit: -1 } })
//         ]);

//         setProducts({
//           cobot,
//           sensor,
//           gripper,
//           safety,
//           industrialRobot,
//           mobileRobot,
//         });
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setIsLoading(false);
//     });

//     if (videoRef.current) {
//       videoRef.current.play().catch((error) => {
//         console.error("Autoplay was blocked:", error);
//       });
//     }

//     return () => unsubscribe();
//   }, [videoRef]);

//   const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

//   const numberWithCommas = useCallback((x) => {
//     return x.toLocaleString("en-IN");
//   }, []);

//   const formatPrice = useCallback((price) => {
//     return `${numberWithCommas(price)}`;
//   }, [numberWithCommas]);

//   const ProductList = memo(({ title, items, isVideo, videoSrc }) => (
//     <>
//       <h2 className="text-center mb-3 " style={{margin: "40px"}}>{title}</h2>
//       <div
//         className="container d-none d-xl-block d-md-block d-sm-none"
//         style={{
//           boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
//           backgroundColor: "#eee",
//         }}
//       >
//         <div className="row">
//           {isVideo && items.data && (
//             <div className="col-lg-3 col-md-3 col-sm-12">
//               <Link href={`/category/${items.data[0]?.attributes.category?.data?.id}-${items.data[0]?.attributes.category_name}`}>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   muted
//                   loop
//                   style={{
//                     objectFit: "cover",
//                     width: "300px",
//                     height: "705px",
//                     marginLeft: "-15px",
//                   }}
//                 >
//                   <source src={getStrapiMedia(videoSrc)} type="video/mp4" />
//                 </video>
//               </Link>
//             </div>
//           )}
//           <div className="col-lg-9 col-md-9 col-sm-12 ">
//             <div className="row">
//               {items.data?.map((el) => (
//                 <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
//                   <Link href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}>
//                     {isLoading ? (
//                       <SkeletonLoader />
//                     ) : (
//                       <img
//                         src={getStrapiMedia(el.attributes.image)}
//                         style={{ width: "200px", height: "200px", borderBottom: '1px solid black' }}
//                         className="sensor-image"
//                         alt={el.attributes.product.data.attributes.name}
//                       />
//                     )}
//                     <h5 className="mt-1" style={{ color: "black" }}>
//                       {el.attributes.product.data.attributes.product_name}
//                     </h5>
//                     {user ? (
//                       <h5 className="price-detail">
//                         {el.attributes.product.data.attributes.product_price === "0" ? (
//                           <h5>For Price Please Enquire</h5>
//                         ) : (
//                           <h5>
//                             {symbol}
//                             {formatPrice(el.attributes.product.data.attributes.product_price * currencyValue.toFixed(2))}
//                           </h5>
//                         )}
//                       </h5>
//                     ) : (
//                       <Link href="/login">
//                         <h5 className="price-detail" style={{ color: "#FF8400" }}>
//                           Please Login for Price
//                         </h5>
//                       </Link>
//                     )}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container d-block d-xl-none d-md-none d-sm-block">
//         <div className="row" style={{
//           boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
//           backgroundColor: "#eee",
//           marginLeft: '5px',
//           marginRight: '5px',
//         }}>
//           {isVideo && items.data && (
//             <div className="col-12" style={{ padding: '0' }}>
//               <Link href={`/category/${items.data[0]?.attributes.category?.data?.id}-${items.data[0]?.attributes.category_name}`}>
//                 <img
//                   src={getStrapiMedia(items.data[0].attributes.mobile_banner)}
//                   style={{ objectFit: 'cover', width: '100%' }}
//                   alt={title}
//                 />
//               </Link>
//             </div>
//           )}
//           <div className="row">
//             {items.data?.map((el) => (
//               <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
//                 <Link href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}>
//                   {isLoading ? (
//                     <SkeletonLoader />
//                   ) : (
//                     <img
//                       src={getStrapiMedia(el.attributes.image)}
//                       style={{ width: "100px", height: "100px", borderBottom: '1px solid black' }}
//                       className="sensor-image"
//                       alt={el.attributes.product.data.attributes.name}
//                     />
//                   )}
//                   <h5 className="mt-1" style={{ color: "black" }}>
//                     {el.attributes.product.data.attributes.product_name}
//                   </h5>
//                   {user ? (
//                     <h5 className="price-detail">
//                       {el.attributes.product.data.attributes.product_price === "0" ? (
//                         <h5>For Price Please Enquire</h5>
//                       ) : (
//                         <h5>
//                           {symbol}
//                           {formatPrice(el.attributes.product.data.attributes.product_price * currencyValue.toFixed(2))}
//                         </h5>
//                       )}
//                     </h5>
//                   ) : (
//                     <Link href="/login">
//                       <h5 className="price-detail" style={{ color: "#FF8400" }}>
//                         Please Login for Price
//                       </h5>
//                     </Link>
//                   )}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   ));

//   if (isLoading) {
//     return <SkeletonLoader />;
//   }

//   return (
//     <div>
//       <ProductList title="Cobots" items={products.cobot} isVideo videoSrc={products.cobot.data?.[0]?.attributes.category_banner} />
//       <ProductList title="Sensors" items={products.sensor} isVideo videoSrc={products.sensor.data?.[0]?.attributes.category_banner} />
//       <ProductList title="Grippers" items={products.gripper} isVideo videoSrc={products.gripper.data?.[0]?.attributes.category_banner}/>
//       <ProductList title="Safety" items={products.safety} isVideo videoSrc={products.safety.data?.[0]?.attributes.category_banner}/>
//       <ProductList title="Industrial Robots" items={products.industrialRobot} isVideo videoSrc={products.industrialRobot.data?.[0]?.attributes.category_banner}/>
//       <ProductList title="Mobile Robots" items={products.mobileRobot} isVideo videoSrc={products.mobileRobot.data?.[0]?.attributes.category_banner}/>
//     </div>
//   );
// };

// export default CategorizedProducts;
