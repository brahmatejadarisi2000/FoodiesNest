import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from '../utils/helperFunctions';
import { DEBOUNCE_DELAY } from '../utils/constants';

const AddButton = ({ onClick, name, selectedValue = 0 }) => {
  const [quantity, setQuantity] = useState(selectedValue);

  useEffect(() => {
    if (selectedValue) setQuantity(selectedValue);
  }, [selectedValue]);

  const debouncedClick = useCallback(
    debounce(newQuantity => {
      onClick(newQuantity);
    }, DEBOUNCE_DELAY),
    [onClick]
  );

  const handleClick = action => {
    setQuantity(prevQuantity => {
      const newQuantity = action === 'increment' ? prevQuantity + 1 : prevQuantity - 1;
      debouncedClick(newQuantity);
      return newQuantity;
    });
  };
  return (
    <div className="button-inner">
      <div className="button-text">
        {quantity === 0 ? (
          <div onClick={() => handleClick('increment')}>{name}</div>
        ) : (
          <>
            <div onClick={() => handleClick('decrement')}>-</div>
            <div>{quantity}</div>
            <div onClick={() => handleClick('increment')}>+</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddButton;
