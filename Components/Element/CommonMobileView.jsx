import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ShoppingBag } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Cart, Comparision, Homes, wishlist } from '../Constant';
import MobileCompare from '../../Layout/Element/MobileCompare';
import MobileCart from '../../Layout/Element/MobileCart';
import MobileWishList from '../../Layout/Element/MobileWishlist';
import { useRouter } from 'next/router';

const CommonMobileView = ({ }) => {
  const dispatch = useDispatch();
  const [activeIcon, setActiveIcon] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (icon) => {
     // Set isLoading to true when the link is clicked
    //  setIsLoading(true);

    //  // Perform any necessary data loading or API calls here
    //  // For demonstration purposes, we'll use a setTimeout to simulate loading
    //  setTimeout(() => {
    //    // After loading is complete, set isLoading back to false
    //    setIsLoading(false);
    //  }, 2000); // Adjust the timeout value as needed
    setActiveIcon(icon);
  };

  return (
    <div className='mobile-menu d-sm-none'>
      <ul>
        <li
          className={`menu-item ${activeIcon === 'home' ? 'active' : ''
            }`}
          onClick={() => handleClick('home')}
          style={{
            border: activeIcon === 'home' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
          }}
        >
          <Link href={'/'} >
            <Home
              style={{
                color: activeIcon === 'home' ? '#FF8400' : '#FF8400',
              }}
            />
            <span
              style={{
                color: activeIcon === 'home' ? '#FF8400' : '#000',
              }}
            >
              {Homes}
            </span>
          </Link>
        </li>
        <li
          className={`menu-item ${activeIcon === 'shop' ? 'active' : ''
            }`}
          onClick={() => handleClick('shop')}
          style={{
            border: activeIcon === 'shop' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
   
          }}
        >
          
          <Link href={'/shop'}>
            <ShoppingBag
              style={{
                color: activeIcon === 'shop' ? '#FF8400' : '#FF8400',
              }}
            />
            <span
              style={{
                color: activeIcon === 'shop' ? '#FF8400' : '#000',
              }}
            >
              Shop
            </span>
          </Link>
          {/* {isLoading && <div className="loader-spinner"></div>} */}
        </li>
        <li
          className={`menu-item ${activeIcon === 'compare' ? 'active' : ''
            }`}
          onClick={() => handleClick('compare')}
          style={{
            border: activeIcon === 'compare' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
          }}
        >
          <a href='#javascript' onClick={() => handleClick('compare')}>
            <MobileCompare style={{ color: activeIcon === 'compare' ? '#FF8400' : '#000', marginBottom: '0px' }} />
            <span style={{ color: activeIcon === 'compare' ? '#FF8400' : '#000', position: 'relative', bottom: '21px', }}>{Comparision}</span>
          </a>
        </li>
        <li
          className={`menu-item ${activeIcon === 'cart' ? 'active' : ''
            }`}
          onClick={() => handleClick('cart')}
          style={{
            border: activeIcon === 'cart' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
          }}
        >
          <Link href='/cart' onClick={() => handleClick('cart')}>
            <MobileCart style={{ color: activeIcon === 'cart' ? '#FF8400' : '#FF8400' }} />
            <span style={{ color: activeIcon === 'cart' ? '#FF8400' : '#000' }}>{Cart}</span>
          </Link>
        </li>
        <li
          className={`menu-item ${activeIcon === 'wishlist' ? 'active' : ''
            }`}
          onClick={() => handleClick('wishlist')}
          style={{
            border: activeIcon === 'wishlist' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
          }}
        >
          <Link href='/wishlist' onClick={() => handleClick('wishlist')}>
            <MobileWishList
              style={{ color: activeIcon === 'wishlist' ? '#FF8400' : '#FF8400' }}
            />
            <span
              style={{
                color: activeIcon === 'wishlist' ? '#FF8400' : '#000',
                position: 'relative',
                bottom: '21px',
              }}
            >
              {wishlist}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommonMobileView;

