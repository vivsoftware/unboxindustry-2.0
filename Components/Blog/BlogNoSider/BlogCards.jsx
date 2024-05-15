import React, { useEffect, useState, useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getStrapiMedia } from '../../../Utils/media';
import { fetchAPI } from '../../../Utils/api';
import Box from "@mui/material/Box";

 import { Card, CardBody, Col, Row } from "reactstrap";

 import Img from "../../Element/Images";
import SkeletonLoader from "../../Element/SkeletonLoader";

const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false });
const Modal = dynamic(() => import('@mui/material/Modal'), { ssr: false });
const Slider = dynamic(() => import('react-slick'), { ssr: false });

//virtualized list component
const VirtualizedList = dynamic(() => import('react-virtualized/dist/es/List'), { ssr: false }); 

const BlogCards = ({ BlogDataFilter, start, pageNumber }) => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [bannerouter, setBannerouter] = useState(null);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = useMemo(
    () => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const limit = 6;
      const imgUrl = await fetchAPI(
        `/blogs`,
        {
          populate: '*',
          pagination: {
            start: `${pageNumber * limit}`,
            limit: limit,
          },
          sort: 'createdAt:desc',
        },
        {
          encodeValuesOnly: true,
        }
      );

      setData(imgUrl.data);
    };

    fetchData();
  }, [start, pageNumber]);

  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        const imgUrlBanner = await fetchAPI(
          `/blogbanners`,
          {
            populate: '*',
          },
          {
            encodeValuesOnly: true,
          }
        );

        setBannerouter(imgUrlBanner.data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchDatabase();
  }, []);

  const handleLoad = (elem) => {
    setLoad(true);
    handleOpen();
    router.push(`/blog/${elem.id}-${elem.attributes.blog_slug}`);
  };

  if (!data) {
    return <SkeletonLoader />;
  }

  const settings = {
    autoplay: true,
    pauseOnHover: false,
    dots: true,
    arrows: false,
  };

  // return (
  //       <>
  //         <div className="d-none d-xl-block d-md-block d-sm-none">
  //           <Slider {...settings} className="mt-3 mb-5">
  //             {bannerouter.map((elem) => (
  //               <div key={elem.id} className="slider-item">
  //                 <div className="row">
  //                   <Link onClick={() => handleLoad(elem)} href="">
  //                     {/* <Link onClick={handleLoad=()=>  {elem}} href={`/blog/${elem.id}-${elem.attributes.blog_slug}`}> */}
  //                     <Img
  //                       src={getStrapiMedia(elem.attributes.banner)}
  //                       className="card-img-top"
  //                       alt={elem.attributes.title}
  //                       height={500}
  //                       width={400}
  //                     />
  //                   </Link>
    
                   
  //                   <div className="col-2"></div>
  //                 </div>
  //               </div>
  //             ))}
  //           </Slider>
  //         </div>
  //         <div className="d-block d-xl-none d-md-none d-sm-block">
  //           <Slider {...settings} className=" mb-5" style={{ marginTop: "0px" }}>
  //             {data.map((elem) => (
  //               <div key={elem.id} className="slider-item">
  //                 <div className="row">
  //                   <div className="col-12">
  //                     {load}
  //                     <Link onClick={() => handleLoad(elem)} href="">
  //                       <Img
  //                         src={getStrapiMedia(elem.attributes.image)}
  //                         className="card-img-top mt-2"
  //                         height={500}
  //                         width={400}
  //                         alt={elem.attributes.title}
  //                       />
  //                     </Link>
  //                   </div>
                    
  //                 </div>
  //               </div>
  //             ))}
  //           </Slider>
  //         </div>
  //         <Row className="g-4 mt-5">
  //           {data.map((elem) => {
  //             return (
  //               <Col lg="4" md="6" key={elem.id}>
  //                 <Card className="blog-categority">
  //                   {/* <Link href={'/blog/blog_details'} className='blog-img'> */}
  //                   <Link onClick={() => handleLoad(elem)} href="">
  //                     <Img
  //                       src={getStrapiMedia(elem.attributes.image)}
  //                       className="img-fluid"
  //                       alt={elem.attributes.title}
  //                     />
  //                   </Link>
  //                   <CardBody>
  //                     <h5>{elem.title}</h5>
  //                     <Link href={"/blog/blog_details"}>
  //                       <h2 className="card-title">{elem.attributes.heading}</h2>
  //                     </Link>
  //                     <div className="">
  //                       <div className="image-name">
  //                         <h3 className="text-center">{elem.attributes.title}</h3>
  //                         <br />
  //                         <p
  //                           className="blog-para mt-3 "
  //                           style={{
  //                             color: "#888 !important",
  //                             fontFamily: '"Poppins", sans-serif',
  //                           }}
  //                           dangerouslySetInnerHTML={{
  //                             __html: `${elem.attributes.short_description}`,
  //                           }}
  //                         ></p>
  //                       </div>
  //                     </div>
  //                   </CardBody>
  //                 </Card>
  //               </Col>
  //             );
  //           })}
  //         </Row>
    
  //         <div>
  //           <Button onClick={handleOpen}>Open modal</Button>
  //           <Modal
  //             open={open}
  //             // onClose={handleClose}
  //             aria-labelledby="modal-modal-title"
  //             aria-describedby="modal-modal-description"
  //           >
  //             <Box sx={style}>
  //               <Box style={{ marginLeft: "10px", paddingLeft: "80px" }}>
  //                 <CircularProgress
  //                   style={{ width: "100px", height: "84", color: "#ff8400" }}
  //                 />
  //               </Box>
  //             </Box>
  //           </Modal>
  //         </div>
  //       </>
  //     );
  //   };
  
  const rowRenderer = ({ index, style }) => {
    const elem = data[index];
    return (
      <div key={elem.id} style={style}>
        <Col lg="4" md="6">
          <Card className="blog-categority">
            <Link onClick={() => handleLoad(elem)} href="">
            <Img
                src={getStrapiMedia(elem.attributes.image)}
                className="img-fluid"
                alt={elem.attributes.title}
              />
            </Link>
            <CardBody>
              <h5>{elem.title}</h5>
              <Link href={"/blog/blog_details"}>
                <h2 className="card-title">{elem.attributes.heading}</h2>
              </Link>
              <div className="">
                <div className="image-name">
                  <h3 className="text-center">{elem.attributes.title}</h3>
                  <br />
                  <p
                    className="blog-para mt-3 "
                    style={{
                      color: "#888 !important",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `${elem.attributes.short_description}`,
                    }}
                  ></p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  };

  return (
    <>
            <div className="d-none d-xl-block d-md-block d-sm-none">
        <Slider {...settings} className="mt-3 mb-5">
          {bannerouter.map((elem) => (
            <div key={elem.id} className="slider-item">
              <div className="row">
                <Link onClick={() => handleLoad(elem)} href="">
                  <Img
                    src={getStrapiMedia(elem.attributes.banner)}
                    className="card-img-top"
                    alt={elem.attributes.title}
                    height={500}
                    width={400}
                  />
                </Link>
                <div className="col-2"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="d-block d-xl-none d-md-none d-sm-block">
        <Slider {...settings} className=" mb-5" style={{ marginTop: "0px" }}>
          {data.map((elem) => (
            <div key={elem.id} className="slider-item">
              <div className="row">
                <div className="col-12">
                  {load}
                  <Link onClick={() => handleLoad(elem)} href="">
                    <Img
                      src={getStrapiMedia(elem.attributes.image)}
                      className="card-img-top mt-2"
                      height={500}
                      width={400}
                      alt={elem.attributes.title}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Row className="g-4 mt-5">
        <Col lg="6">
          {data.slice(0, 3).map((elem) => (
            <Card className="blog-categority mb-4" key={elem.id}>
              <Link onClick={() => handleLoad(elem)} href="">
                <Img
                  src={getStrapiMedia(elem.attributes.image)}
                  className="img-fluid"
                  alt={elem.attributes.title}
                />
              </Link>
              <CardBody>
                <h5>{elem.title}</h5>
                <Link href={"/blog/blog_details"}>
                  <h2 className="card-title">{elem.attributes.heading}</h2>
                </Link>
                <div className="">
                  <div className="image-name">
                    <h3 className="text-center">{elem.attributes.title}</h3>
                    <br />
                    <p
                      className="blog-para mt-3 "
                      style={{
                        color: "#888 !important",
                        fontFamily: '"Poppins", sans-serif',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${elem.attributes.short_description}`,
                      }}
                    ></p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
        <Col lg="6">
          {data.slice(3, 6).map((elem) => (
            <Card className="blog-categority mb-4" key={elem.id}>
              <Link onClick={() => handleLoad(elem)} href="">
                <Img
                  src={getStrapiMedia(elem.attributes.image)}
                  className="img-fluid"
                  alt={elem.attributes.title}
                />
              </Link>
              <CardBody>
                <h5>{elem.title}</h5>
                <Link href={"/blog/blog_details"}>
                  <h2 className="card-title">{elem.attributes.heading}</h2>
                </Link>
                <div className="">
                  <div className="image-name">
                    <h3 className="text-center">{elem.attributes.title}</h3>
                    <br />
                    <p
                      className="blog-para mt-3 "
                      style={{
                        color: "#888 !important",
                        fontFamily: '"Poppins", sans-serif',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${elem.attributes.short_description}`,
                      }}
                    ></p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
      <div>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
            <Box style={{ marginLeft: "10px", paddingLeft: "80px" }}>
              <CircularProgress
                style={{ width: "100px", height: "84", color: "#ff8400" }}
              />
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default memo(BlogCards);