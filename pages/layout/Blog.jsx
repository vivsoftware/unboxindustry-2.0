
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
// import { getAllUsers } from '../../Service/FetchApi';
import BlogCards from '../../Components/Blog/BlogNoSider/BlogCards';
import PaginationSidebar from '../../Components/Blog/BlogNoSider/PaginationSidebar';

const BlogNoSidebarContain = (data) => {
  const dispatch = useDispatch();
  const types = 'GETBLOGDATA';
  const { Blogdatanew } = useSelector((state) => state.BlogReducer);
  const BlogDataFilter = Blogdatanew && Blogdatanew.filter((el) => el.type === 'blogcard');

  const [start, setStart] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 6;
  

  const handlePageChange = (newPage) => {
    setStart(newPage * limit);
    setPageNumber(newPage);
  }

  const currentData = BlogDataFilter && BlogDataFilter.slice(start, start + limit);
  return (
    <section className='left-sidebar-section masonary-blog-section section-b-space'>
      <Container>
        <Row className='g-4'>
          <Col xs='12' className='ratio3_2'>
            <BlogCards pageNumber={pageNumber} start = {start} BlogDataFilter={BlogDataFilter} data={data} />
            <PaginationSidebar 
              currentPage={pageNumber} 
              totalPages={Math.ceil((BlogDataFilter?.length || 0) / limit   )} 
              onPageChange={handlePageChange} 
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogNoSidebarContain;
