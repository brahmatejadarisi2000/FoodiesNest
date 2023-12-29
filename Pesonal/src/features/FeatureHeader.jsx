import React from 'react';
import SearchIcon from '../icons/SearchIcon';
import SignInIcon from '../icons/SignInIcon';
import HelpIcon from '../icons/HelpIcon';
import CartIcon from '../icons/CartIcon';
import { Link } from 'react-router-dom';
import CartCountIcon from '../icons/cartCountIcon';
import { getCartCountSelector } from '../store/cart/cart.selector';
import { useSelector } from 'react-redux';

function FeatureHeader() {
  const cartCount = useSelector(getCartCountSelector);
  console.log({ cartCount });
  return (
    <div className="header">
      <Link to={'/'}>
        <img className="logo" alt="logo" src={require('../asserts/foodieLogo.jpg')} />
      </Link>
      <div className="headerOptions">
        <Link to={'/search'}>
          <span>
            <SearchIcon />
            Search
          </span>
        </Link>
        <Link to={'/checkout'}>
          <span style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                right: '120%',
                lineHeight: '0',
              }}
            >
              <CartCountIcon />
              <span className={'cart-count'}>{cartCount}</span>
            </span>
            Cart
          </span>
        </Link>
        <Link to={'/'}>
          <span>
            <HelpIcon />
            Help
          </span>
        </Link>
        <Link to={'/'}>
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