import ShimmeredCard from './ShimmeredCard';
import CircleStarIcon from '../icons/CircleStarIcon';
import { Link } from 'react-router-dom';
import { cleanUrl } from '../utils/helperFunctions';

function Card({ restaurant }) {
  const header = restaurant?.info?.aggregatedDiscountInfoV3?.header;
  const subHeader = restaurant?.info?.aggregatedDiscountInfoV3?.subHeader;

  if (restaurant) {
    return (
      <Link
        to={cleanUrl(
          `/restaurants/${restaurant?.info?.name}-${restaurant?.info?.locality}-${restaurant?.info?.areaName}-${restaurant?.info?.id}`
        )}
      >
        <div className="card">
          <div className="card-image">
            <img
              src={
                restaurant.info?.cloudinaryImageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`
                  : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${restaurant.imageId}`
              }
              alt="logo"
              height={'180px'}
              width={'255px'}
              object-fit={'cover'}
            />
            {header && subHeader && <div className="offersLayout">{`${header} ${subHeader}`}</div>}
          </div>
          <div className="card-content">
            {restaurant?.info?.name && (
              <>
                <div className="card-name">
                  {restaurant?.info?.name.length > 28
                    ? `${restaurant?.info?.name.slice(0, 28)}...`
                    : restaurant?.info?.name}
                </div>
                <div className="card-rating">
                  <CircleStarIcon />
                  {`${restaurant?.info?.avgRatingString}`}
                  {' . '}
                  {restaurant?.info?.sla?.deliveryTime ? `${restaurant?.info?.sla?.deliveryTime} MIN` : `-`}
                </div>

                <div className="card-descriptions-container">
                  <div>{restaurant?.info?.cuisines.slice(0, 4).join(',')}</div>
                  <div>{restaurant?.info?.areaName}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }
}

export default Card;
