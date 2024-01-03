import React, { useRef } from "react";
import Card from "./Card";
import ShimmeredCard from "./ShimmeredCard";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

function CardContainer({
  title,
  padding = undefined,
  restaurants,
  flexWrap = false,
}) {
  const inlineStyles = {
    paddingLeft: `${padding?.left}px`,
    paddingTop: `${padding?.top}px`,
  };

  const cardContainerRef = useRef();

  const handleArrowClick = (direction, e) => {
    e.stopPropagation();
    if (cardContainerRef.current) {
      // Check if scrolling is enabled
      const container = cardContainerRef.current;
      const isScrollable = container.scrollWidth > container.clientWidth;

      if (isScrollable) {
        // Set the scroll distance based on the direction
        const scrollDistance = 280; // Adjust this value as needed

        // Determine the new scroll position based on the direction
        if (direction === "left" && container.scrollLeft > 0) {
          container.scrollBy({
            left: -scrollDistance,
            behavior: "smooth",
          });
        } else if (direction === "right") {
          container.scrollBy({
            left: scrollDistance,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <div className='card-container' style={inlineStyles}>
      <div className='card-container-header'>
        {restaurants ? (
          <div className={"card-container-main"}>
            <h2 className={"card-container-title"}>{title}</h2>
            {!flexWrap && (
              <div className={"card-container-move"}>
                <div
                  className={"card-container-Arrow"}
                  onClick={(e) => handleArrowClick("left", e)}
                >
                  <LeftArrowIcon />
                </div>
                <div
                  className={"card-container-Arrow"}
                  onClick={(e) => handleArrowClick("right", e)}
                >
                  <RightArrowIcon />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='shimmer-container-title' />
        )}
      </div>
      <div
        className={
          !flexWrap ? "card-container-body" : "card-container-wrap-body"
        }
        ref={cardContainerRef}
      >
        {restaurants
          ? restaurants?.map((restaurant, index) => (
              <Card restaurant={restaurant} key={index} />
            ))
          : Array(6)
              .fill("0")
              .map((el, index) => <ShimmeredCard key={index} />)}
      </div>
      <hr className='card-container-footer' />
    </div>
  );
}

export default CardContainer;
