import React, {useEffect, useState} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { JustForYou, DealsoftheDay } from '../../Constant';
import SectionHeader from '../../Element/SectionHeader';
import ProductCard from './ProductCard';
import SkeletonLoader from '../../Element/SkeletonLoader';
const ElectronicCollection = ({ productData }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <section className='ratio_asos'>
      <Container fluid={true} className='p-0 home-page'>
        <Row className='m-0'>
          <Col sm='12' className='p-0 mt-5'>
          <h1><SectionHeader subTitle={JustForYou} title={DealsoftheDay}/></h1>
            {isLoading?(
              <SkeletonLoader/>
            ):(
              <ProductCard ProductFilter={productData} />

            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ElectronicCollection;
