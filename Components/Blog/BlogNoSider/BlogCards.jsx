import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { fetchAPI } from '../../../Utils/api';
import { getStrapiMedia } from '../../../Utils/media';
import Img from '../../Element/Images';
import SkeletonLoader from '../../Element/SkeletonLoader';

const BlogCards = ({ BlogDataFilter, start, pageNumber }) => {
  const [data, setData] = useState(null);
  const [load, setload] = useState(false);
  const [bannerouter, setbannerouter] = useState(null);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    async function fetchData() {
      const limit = 6;
      const imgUrl = await fetchAPI(`/blogs`, {
        populate: '*',
        pagination: {
          start: `${pageNumber * limit}`,  //offset
          limit: limit,
        },
        sort: 'createdAt:desc' // changes sort by creation date in descending order
      },
        {
          encodeValuesOnly: true, // prettify URL
        });
      setData(imgUrl.data);
    }
    fetchData();
  }, [start, pageNumber]);  //changes for changing pages data (Include start and pageNumber in the dependency array)

  useEffect(() => {
    async function fetchDatabase() {
      try {
        const imgUrlBanner = await fetchAPI(`/blogbanners`, {
          populate: '*', // Assuming '*' is a valid option for fetching all fields
        }, {
          encodeValuesOnly: true, // Prettify URL
        });
        setbannerouter(imgUrlBanner.data);
      } catch (error) {
        // Handle any errors from the fetchAPI call
        console.error("Error fetching banner data:", error);
      }
    }
    fetchDatabase(); // Call the async function
    // Since the dependency array is empty, this effect only runs once after the component mounts
  }, []);
  //changes for changing pages data (Include start and pageNumber in the dependency array)
  if (!data) {
    return <SkeletonLoader />;
  }
  const settings = {
    autoplay: true,
    pauseOnHover: false,
    dots: true,
    arrows: false
  };
  const handleLoad = (elem) => {
    setload(true)
    handleOpen()
    router.push(`/blog/${elem.id}-${elem.attributes.blog_slug}`);
  }
  console.log("baneerere", bannerouter)
  return (
    <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <Slider {...settings} className='mt-3 mb-5'>
          {bannerouter.map((elem) => (
            <div key={elem.id} className="slider-item">
              <div className="row">
                <Link onClick={() => handleLoad(elem)} href="">
                  {/* <Link onClick={handleLoad=()=>  {elem}} href={`/blog/${elem.id}-${elem.attributes.blog_slug}`}> */}
                  <Img src={getStrapiMedia(elem.attributes.banner)} className='card-img-top' alt={elem.attributes.title} height={100} width={100} />
                  {/* <Img src={`https://strapi.unboxindustry.com/uploads/41i_YUZFHXOL_AC_UF_1000_1000_QL_80_1_8f242b035c.jpg`} className='card-img-top' alt={elem.attributes.title} height={300} width={1080} /> */}
                </Link>
                {/* <div className='col-4'>                               
                </div>
                <div className='col-6' style={{ marginTop: '100px' }}>
                  <Link href={`/blog/${elem.id}-${elem.attributes.blog_slug}`}>
                    <h2 className='headingstyle' style={{ textTransform: 'none', color: 'black', textAlign: 'left' }}>{elem.attributes.title}</h2>
                    <p className='mt-3' style={{ color: '#888 !important', fontFamily: '"Poppins", sans-serif' }} dangerouslySetInnerHTML={{ __html: `${elem.attributes.short_description}` }}></p>
                  </Link>
                </div> */}
                <div className='col-2'></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block'>
        <Slider {...settings} className=' mb-5' style={{ marginTop: '0px' }}>
          {data.map((elem) => (
            <div key={elem.id} className="slider-item">
              <div className="row" >
                <div className='col-12'>
                  {/* {load} */}
                  <Link onClick={() => handleLoad(elem)} href="">
                    <Img  src={getStrapiMedia(elem.attributes.image)} className='card-img-top mt-2' height={500} width={400} alt={elem.attributes.title} />
                  </Link>
                </div>
                {/* <div className='col-8' style={{marginTop:'50px'}}>
            <Link href={`/blog/${elem.id}`}>
              <h2 className='headingstyle' style={{ textTransform: 'none',color:'black',textAlign:'left' }}>{elem.attributes.title}</h2>
              <p className='mt-3' style={{color:'#888 !important',fontFamily:'"Poppins", sans-serif'}} dangerouslySetInnerHTML={{ __html: `${elem.attributes.short_description}` }}></p>
              </Link>
            </div> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Row className='g-4 mt-5'>
        {data.map((elem) => {
          return (
            <Col lg='4' md='6' key={elem.id}>
              <Card className='blog-categority'>
                {/* <Link href={'/blog/blog_details'} className='blog-img'> */}
                <Link onClick={() => handleLoad(elem)} href="">
                <Img  src={getStrapiMedia(elem.attributes.image)} className='card-img-top mt-2' height={300} width={300} alt={elem.attributes.title} />
                </Link>
                <CardBody>
                  <h5>{elem.title}</h5>
                  <Link href={'/blog/blog_details'}>
                    <h2 className='card-title'>{elem.attributes.heading}</h2>
                  </Link>
                  <div className=''>
                    <div className='image-name'>
                      <h3 className='text-center'>{elem.attributes.title}</h3>
                      <br />
                      <p className='blog-para mt-3 ' style={{ color: '#888 !important', fontFamily: '"Poppins", sans-serif' }} dangerouslySetInnerHTML={{ __html: `${elem.attributes.short_description}` }}></p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    
    </>
  );
};
export default BlogCards;
