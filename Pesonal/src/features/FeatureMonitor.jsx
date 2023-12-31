import React, { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import useFetch from "../hooks/useFetch";
import useGeolocation from "../hooks/useGeolocation";
import { BEST_OFFERS_FOR_YOU } from "../utils/constants";
import { getCartCountSelector } from "../store/cart/cart.selector";
import { fixture1 } from "../fixtures/fixture1";

export default function FeatureMonitor() {
  const [topRestaurants, setTopRestaurants] = useState(null);
  const [bestOffers, setBestOffers] = useState(null);
  const [popularRestaurantsTitle, setPopularRestaurantsTitle] = useState("");
  const [restaurants, setRestaurants] = useState(null);
  const { location } = useGeolocation();

  const data = useFetch(
    `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.latitude}&lng=${location.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
  );

  console.log(data?.data);
  console.log(data?.data?.cards[2]?.card?.card?.title);
  console.log(fixture1);

  useEffect(() => {
    setTopRestaurants(data?.data?.cards[2]?.card?.card);
    setBestOffers(data?.data?.cards[0]?.card?.card);
    setPopularRestaurantsTitle(data?.data?.cards[2]?.card?.card?.title);
    setRestaurants(data?.data?.cards[4]?.card?.card);
  }, [data]);

  console.log(restaurants);

  return (
    <div className='monitor'>
      {data?.data?.cards.slice(0, 2).map((card) => {
        console.log(card.card?.card);
        return (
          <CardContainer
            key={card.card?.card?.header?.title}
            title={card.card?.card?.header?.title}
            padding={card?.card?.card?.header?.headerStyling?.padding}
            restaurants={
              card?.card?.card?.gridElements?.infoWithStyle?.info ||
              card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            }
          />
        );
      })}
      <CardContainer
        title={popularRestaurantsTitle}
        restaurants={restaurants?.gridElements?.infoWithStyle?.restaurants}
        flexWrap={true}
      />
    </div>
  );

  // console.log(topRestaurants?.gridElements?.infoWithStyle);

  // return (
  //   <>
  //     <CardContainer
  //       title={bestOffers && BEST_OFFERS_FOR_YOU}
  //       padding={bestOffers?.header?.headerStyling?.padding}
  //       restaurants={bestOffers?.gridElements?.infoWithStyle?.info}
  //     />

  //     <CardContainer
  //       title={topRestaurants?.header?.title}
  //       padding={topRestaurants?.header?.headerStyling?.padding}
  //       restaurants={topRestaurants?.gridElements?.infoWithStyle?.restaurants}
  //     />

  //     <CardContainer
  //       title={popularRestaurantsTitle}
  //       restaurants={restaurants?.gridElements?.infoWithStyle?.restaurants}
  //       flexWrap={true}
  //     />
  //   </>
  // );
}
