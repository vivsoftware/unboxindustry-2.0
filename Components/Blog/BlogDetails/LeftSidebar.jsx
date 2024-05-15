import React from 'react';
import { Col } from 'reactstrap';
import LeftPopularCard from './LeftPopularCard';

const LeftSidebar = ({products,categories}) => {
  return (
    <Col lg='3' md='4'>
      <div className='left-side'>
        {/* <LeftSearch /> */}

        <LeftPopularCard categories={categories} products={products}/>
        {/* <LeftCategory /> */}
      </div>
    </Col>
  );
};

export default LeftSidebar;
