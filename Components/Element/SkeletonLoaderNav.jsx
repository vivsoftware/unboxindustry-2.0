// src/Components/Element/SkeletonLoader.js
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-header">
        <div className="skeleton-logo"></div>
        <div className="skeleton-nav"></div>
      </div>
      {/* <div className="skeleton-content">
        <div className="skeleton-banner"></div>
        <div className="skeleton-cards">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div> */}
      <div className="skeleton-footer">
        <div className="skeleton-footer-content"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
