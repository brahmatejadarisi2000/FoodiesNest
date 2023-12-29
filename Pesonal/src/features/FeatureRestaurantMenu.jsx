import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useGeolocation from '../hooks/useGeolocation';
import RestaurantCard from '../ui/RestaurantCard';
import AddButton from '../ui/AddButton';
import CircleStarIcon from '../icons/CircleStarIcon';
import { setMenuBranch } from '../store/menu-branch/menu-branch.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuBranchSelector } from '../store/menu-branch/menu-branch.selector';
import { addItemToCart } from '../store/cart/cart.slice';
import { getCartItemsSelector, getCartPriceSelector } from '../store/cart/cart.selector';

import { useNavigate } from 'react-router-dom';
const FeatureRestaurantMenu = () => {
  const { name } = useParams();
  const id = name.split('-').slice(-1)[0];
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector(getMenuBranchSelector);
  const cartItems = useSelector(getCartItemsSelector);
  const navigate = useNavigate();
  const totalPrice = useSelector(getCartPriceSelector);

  useEffect(() => {
    if (selectedCategory) {
      scrollToSelectedCategory();
    }
  }, [selectedCategory]);

  const scrollToSelectedCategory = () => {
    const element = document.querySelector(`[data-category="${selectedCategory}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    } else {
      console.error(`Element with data attribute value ${selectedCategory} not found.`);
    }
  };

  const handleOpenBranch = () => {
    dispatch(
      setMenuBranch({
        selectedCategory: '',
        content: groupByMenuCategories,
        isOpen: true,
      })
    );
  };

  const addItem = ({ itemName, itemPrice, restaurantName, quantity }) => {
    localStorage.setItem('selectedRestaurant', restaurantInfo.id);
    dispatch(addItemToCart({ itemName, itemPrice, restaurantName, quantity }));
  };

  const { location } = useGeolocation();
  const fetchRestaurantMenu = useFetch(
    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${location.latitude}&lng=${location.longitude}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTERS`
  );
  const menuItems = fetchRestaurantMenu?.data?.cards[2]?.groupedCard?.cardGroupMap['REGULAR']?.cards.slice(1);
  const restaurantInfo = fetchRestaurantMenu?.data?.cards[0]?.card?.card?.info;
  const groupByMenuCategories = menuItems?.map(menuItem => ({
    title: menuItem.card.card?.title,
    count: menuItem.card.card?.itemCards?.length,
  }));

  const findItemIndex = (itemName, restaurantName) => {
    const index = cartItems.findIndex(item => item.itemName === itemName && item.restaurantName === restaurantName);
    return index;
  };

  return (
    <>
      <div className="restaurant-menu">
        {restaurantInfo && (
          <div className="restaurant-menu-header">
            <div className="restaurant-menu-header-titles">
              <div className="restaurant-menu-title">{restaurantInfo.name}</div>
              <div className="restaurant-menu-sub-title">
                {`${restaurantInfo.areaName}, ${restaurantInfo.sla.lastMileTravel} km`}
              </div>
            </div>
            <div className="restaurant-menu-rating">
              <span>
                <CircleStarIcon />
                {restaurantInfo.avgRating}
              </span>
              <span>{restaurantInfo.totalRatingsString}</span>
            </div>
          </div>
        )}
        <div className="restaurant-menu-body">
          {menuItems?.length > 0 &&
            menuItems.map((itemsGroup, index) => (
              <div className="items-list" key={index}>
                {itemsGroup.card.card?.itemCards?.length > 0 && (
                  <h3
                    data-category={itemsGroup.card.card?.title}
                  >{`${itemsGroup.card.card.title} (${itemsGroup.card.card.itemCards.length})`}</h3>
                )}
                {itemsGroup.card.card?.itemCards?.map(item => (
                  <RestaurantCard
                    itemName={item.card.info.name}
                    itemDescription={item.card.info.description}
                    itemPrice={item.card.info.price}
                    cloudinaryImageId={item.card.info.imageId}
                    key={item.card.info.id}
                    width={'50vw'}
                  >
                    <AddButton
                      onClick={quantity =>
                        addItem({
                          itemName: item.card.info.name,
                          itemPrice: item.card.info.price,
                          restaurantName: restaurantInfo.name,
                          quantity,
                        })
                      }
                      selectedValue={
                        findItemIndex(item.card.info.name, restaurantInfo.name) === -1
                          ? 0
                          : cartItems[findItemIndex(item.card.info.name, restaurantInfo.name)].quantity
                      }
                      name={'Add'}
                    />
                  </RestaurantCard>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="fixed-div">
        <button style={{ border: 'none', background: 'transparent' }}>
          <div onClick={handleOpenBranch} className="menu-button">
            {'Browse Menu'}
          </div>
        </button>
      </div>
      {cartItems.length > 0 && (
        <div
          className="fixed-div"
          style={{
            height: '48px',
            background: '#60b246',
            width: '50%',
            bottom: '5%',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1px 1vw',
            fontWeight: '600',
            fontSize: 'middle',
          }}
        >
          <div>{`${cartItems.length} ${cartItems.length === 1 ? 'Item' : 'Items'} | ${totalPrice}`}</div>

          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/checkout');
            }}
          >
            {`VIEW CART`}
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureRestaurantMenu;
