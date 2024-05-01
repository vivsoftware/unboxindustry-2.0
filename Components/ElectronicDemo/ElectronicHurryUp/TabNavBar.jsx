// export default TabNavBar;
import React, { lazy, Suspense,useState, useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { fetchAPI } from '../../../Utils/api';
// import TabpanSection from '../../FurnitureDemo/FurnitureTabSection/TabpanSection';
const LazyTabpanSection = lazy(() => import('../../FurnitureDemo/FurnitureTabSection/TabpanSection'));

const TabNavBar = ({ TabFilter }) => {
  const [newtabs, setNewtabs] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [num, setNum] = useState(0);
  const [val, setVal] = useState('Camera');
  const TabMiddleColor = 'offer-end';
  const LeftRightTab = 'product-box';

  useEffect(() => {
    fetchAPI('/homepage', {
      populate: ['hurryup', 'hurryup.products', 'hurryup.products.product_display'],
    }).then((res) => {
      setNewtabs(res.data.attributes.hurryup);
    });
  }, []);

  useEffect(() => {
    if (newtabs && newtabs.length > 0) {
      setNum(0);
      setVal(newtabs[0].nav_name);
    }
  }, [newtabs]);

  const toggle = (tab, elem) => {
    setActiveTab(tab);
    setNum(tab);
    setVal(elem.nav_name);
  };

  return (
    <>
      <Nav className='nav-tabs' id='myTab'>
        {newtabs?.map((elem, i) => {
          return (
            <NavItem key={i}>
              <NavLink href='#javascript' className={`${activeTab === i ? 'active show' : ''}`} onClick={() => toggle(i, elem)}>
                {elem.nav_name}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      {/* <TabpanSection activeTab={activeTab} num={num} val={val} TabMiddleColor={TabMiddleColor} LeftRightTab={LeftRightTab} newtabs={newtabs} /> */}
      <Suspense fallback={<div>Loading Tabpansection.... </div>}>
        < LazyTabpanSection  
          activeTab={activeTab}
          num={num}
          val={val}
          TabMiddleColor={TabMiddleColor}
          LeftRightTab={LeftRightTab}
          newtabs={newtabs}
        />
      </Suspense>
    </>
  );
};

export default TabNavBar;
