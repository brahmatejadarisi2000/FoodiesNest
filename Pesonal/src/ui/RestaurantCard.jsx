import React, { useState } from 'react';
import { SymbolFromCharCode } from '../utils/helperFunctions';
import RightArrowIcon from '../icons/RightArrowIcon';
import { useNavigate } from 'react-router-dom';
import { cleanUrl } from '../utils/helperFunctions';

export default function RestaurantCard({
  restaurantName,
  avgRatingString,
  unorderableMessage,
  deliveryTime,
  itemName,
  itemDescription,
  itemPrice,
  cloudinaryImageId,
  children = <></>,
  restaurantInfoSlugs,
  restaurantId,
  width,
}) {
  const [showMore, setShowMore] = useState(false);
  const Navigate = useNavigate();

  const toggleShowMore = event => {
    event.stopPropagation();
    setShowMore(!showMore);
  };

  const handleArrowClick = () => {
    const url = `/restaurants/${restaurantInfoSlugs.restaurant}-${restaurantInfoSlugs.city}-${restaurantId}?query=${itemName}`;
    Navigate(cleanUrl(url));
  };

  const cardStyle = {
    width: width || '100vw', // Use the provided width or default to 100%
    // Add other styles as needed
  };

  return (
    <div className="search-card" style={cardStyle}>
      {restaurantName && (
        <>
          <div className="search-card-main">
            <div className={'search-card-main-titles'}>
              <div className="search-card-title">{`By ${restaurantName}`}</div>
              <div className="search-card-subtitle">
                <span>
                  {SymbolFromCharCode('0x2605')} {avgRatingString}
                </span>
                <span>{unorderableMessage ? `-` : `${deliveryTime} MIN`}</span>
              </div>
            </div>
            <div className="icon-container" onClick={handleArrowClick}>
              <RightArrowIcon />
            </div>
          </div>
          {unorderableMessage && <div className="restaurants-closed">{unorderableMessage}</div>}
          <div className="divider" />
        </>
      )}

      <div className="search-card-body">
        <div className="search-card-body-main">
          <div className="search-card-item-title">{itemName}</div>
          <div className="search-card-item-price">
            <span className="rupee-icon">₹</span>
            {itemPrice / 100}
          </div>
          {itemDescription && (
            <div className="search-card-item-description">
              {showMore ? (
                <>
                  {`${itemDescription} `}
                  <span className="toggle-bold" onClick={toggleShowMore}>
                    Less
                  </span>
                </>
              ) : (
                <>
                  {`${itemDescription.slice(0, 60)}...  `}
                  {itemDescription.length > 60 && (
                    <span className="toggle-bold" onClick={toggleShowMore}>
                      More
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="search-card-item-image">
          {cloudinaryImageId && (
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
              alt="logo"
              height={'100px'}
              width={'100px'}
              object-fit={'cover'}
            />
          )}

          {children && <div className="search-card-item-button">{children}</div>}
        </div>
      </div>
    </div>
  );
}
