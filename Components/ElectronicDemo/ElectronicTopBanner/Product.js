import React, { lazy, Suspense } from 'react';
const LazyImg = lazy(() => import('next/image'));

const ProductCard = (props) => {
  return (
    <>
      {/* <Card style={{ width: "" }} > */}
        {/* <Card.Img variant="top" src={props.imgSrc} style={{ width: "272px", height: "272px" }} /> */}
        <Suspense fallback={<div>Loading....</div>}>

          <LazyImg
            variant="top" src={props.imgSrc} width={410} height={110} alt="Post-Banner" />
        </Suspense>

      {/* </Card> */}
    </>
  );
};

export default ProductCard;


