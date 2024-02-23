import React from "react";
import SearchIcon from "../icons/SearchIcon";
import SignInIcon from "../icons/SignInIcon";
import HelpIcon from "../icons/HelpIcon";
import CartIcon from "../icons/CartIcon";
import { Link } from "react-router-dom";
import CartCountIcon from "../icons/CartCountIcon";
import { getCartCountSelector } from "../store/cart/cart.selector";
import { useSelector } from "react-redux";

function FeatureHeader() {
  const cartCount = useSelector(getCartCountSelector);
  return (
    <div className='header'>
      <Link to={"/"}>
        <img
          className='logo'
          alt='logo'
          src={require("../asserts/foodieLogo.jpg")}
        />
      </Link>
      <div className='headerOptions'>
        <Link to={"/search"}>
          <span>
            <SearchIcon />
            Search
          </span>
        </Link>
        <Link to={"/"}>
          <span>
            <CartIcon />
            Offers
          </span>
        </Link>
        <Link to={"/checkout"}>
          <span>
            <span className={"cart-count-container"}>
              <CartCountIcon />
              <span className={"cart-count"}>{cartCount}</span>
            </span>
            Cart
          </span>
        </Link>
        <Link to={"/tastycombos"}>
          <span>
            <HelpIcon />
            {"Combo Picks"}
          </span>
        </Link>
        <Link to={"/"}>
          <span>
            <SignInIcon />
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
}

export default FeatureHeader;
