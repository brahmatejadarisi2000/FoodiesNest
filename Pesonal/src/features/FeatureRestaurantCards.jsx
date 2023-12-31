import React from "react";
import { useFetch } from "../hooks/useFetch";
import RestaurantCard from "../ui/RestaurantCard";
import useFetch from "../hooks/useFetch";
import useGeolocation from "../hooks/useGeolocation";

export default function FeatureRestaurantCards({ selectedItem }) {
  const { location } = useGeolocation();
  const data = useFetch(
    `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${location.latitude}&lng=${location.longitude}&str=${selectedItem}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=495a041a-af67-184b-142c-e55f65168bc8&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22EGG%22%2C%22cloudinaryId%22%3A%223156bcfdd9e5be191e052fd23e1d24e2%22%2C%22dishFamilyId%22%3A%22846586%22%2C%22dishFamilyIds%22%3A%5B%22846586%22%5D%2C%22dishTypeIds%22%3A%5B%22847229%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D#`
  );

  return (
    <div className='restaurants-list'>
      {data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards
        .slice(1)
        .map((card) => (
          <div
            key={`${card.card.card.restaurant.info.id} ${card.card.card.info.id}`}
          >
            <RestaurantCard
              restaurantName={card.card.card.restaurant.info.name}
              avgRatingString={card.card.card.restaurant.info.avgRatingString}
              unorderableMessage={
                card.card.card.restaurant.info.unorderableMessage
              }
              deliveryTime={card.card.card.restaurant.info.sla.deliveryTime}
              itemName={card.card.card.info.name}
              itemDescription={card.card.card.info.description}
              itemPrice={card.card.card.info.price}
              cloudinaryImageId={
                card.card.card.restaurant.info.cloudinaryImageId
              }
              restaurantInfoSlugs={card.card.card.restaurant.info.slugs}
              restaurantId={card.card.card.restaurant.info.id}
              width={"28vw"}
            />
          </div>
        ))}
    </div>
  );
}
