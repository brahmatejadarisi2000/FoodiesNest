import React from "react";

import { Link } from "react-router-dom";

export const SearchItems = ({ items }) => {
  const renderSearchItem = (item, index) => (
    <Link
      key={`${index}-${item.text}`}
      to={`/search?query=${encodeURIComponent(item.text)}`}
    >
      <div className='search-item-container'>
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item.cloudinaryId}`}
          alt='image'
          height={"60px"}
          width={"60px"}
          style={{ objectFit: "cover" }}
        />
        <div className='search-item'>
          <div className='title'>{item.text}</div>
          <div className='sub-title'>{item.type}</div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className='search-items'>
      {items?.length > 0 ? (
        <>{items.map((item, index) => renderSearchItem(item, index))}</>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchItems;
