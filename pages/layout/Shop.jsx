import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import AllProducts from '../../Components/Shop/ShopCanvasFilter/AllProducts';
// import SidebarFilter from '../../Components/Shop/ShopLeftSidebarContain/SidebarFilter';
import useFilter from '../../Utils/useFilter';

const ShopLeftSidebarContain = ({ productData, listGrid, products, fetchProducts, show }) => {
  const filterProduct = useFilter(products);
  const StoreProducts = filterProduct && filterProduct;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentData = StoreProducts && StoreProducts?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(StoreProducts?.length / dataPerPage);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handlePageChange = (page) => {
    // Update the current page and fetch products for the new page
    setCurrentPage(page);
    fetchProducts(page);
  };
  const totalPages = Math.ceil(productData / 20);
  return (
    <section className='section-b-space'>
      <div className='container-fluid' style={{marginLeft: '196px'}}>
        <Row>
          
          {/* <SidebarFilter productData={productData} products={products} /> */}
          <Col lg='9' xs='12' className='ratio_30'>
            {/* <FilterButton customClass={'filter-button mb-3'} productData={productData} products={filterProduct} /> */}
            <AllProducts currentData={currentData} />
            {/* <PaginationComp dataPerPage={dataPerPage} StoreProductLength={StoreProducts?.length} currentPage={currentPage} paginate={paginate} /> */}
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default ShopLeftSidebarContain;
