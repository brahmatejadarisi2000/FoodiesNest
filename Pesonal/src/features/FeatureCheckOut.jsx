import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartItemsSelector } from "../store/cart/cart.selector";
import useFetch from "../hooks/useFetch";
import useGeolocation from "../hooks/useGeolocation";
import { Link } from "react-router-dom";
import { cleanUrl } from "../utils/helperFunctions";
import AddButton from "../ui/AddButton";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cart/cart.slice";
import { getCartPriceSelector } from "../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";
import { closeDialogModal, setDialogModal } from "../store/dialog/dialog.slice";
import { resetCart } from "../store/cart/cart.slice";

function FeatureCheckOut() {
  const cartItems = useSelector(getCartItemsSelector);
  const navigate = useNavigate();
  const id = localStorage.getItem("selectedRestaurant");
  const { location } = useGeolocation();
  const dispatch = useDispatch();
  const [tip, setTip] = useState(0);
  const [editingTip, setEditingTip] = useState(false);

  const handleCloseDialog = () => {
    dispatch(closeDialogModal());
    dispatch(resetCart());
    navigate("/");
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      dispatch(
        setDialogModal({
          onConfirm: handleCloseDialog,
          open: true,
          texts: {
            title: "Empty cart",
            messageBody:
              "Your Cart is Empty. You can go to home page to view more restaurants.",
            confirmText: "HOME",
          },
        })
      );
    }
  }, [dispatch, cartItems]);

  const handleTip = () => {
    if (!editingTip) {
      setEditingTip(true);
    }
  };

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleChange = (event) => {
    setTip(event.target.value);
  };

  const handleBlur = () => {
    setEditingTip(false);
  };

  const fetchRestaurantMenu = useFetch(
    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${location.latitude}&lng=${location.longitude}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTERS`
  );
  const restaurantInfo = fetchRestaurantMenu?.data?.cards[0]?.card?.card?.info;

  const addItem = ({ itemName, itemPrice, restaurantName, quantity }) => {
    dispatch(addItemToCart({ itemName, itemPrice, restaurantName, quantity }));
  };

  const totalPrice = useSelector(getCartPriceSelector);

  const handleOpenDialog = ({ onConfirm, open, texts }) => {
    dispatch(
      setDialogModal({
        onConfirm,
        open,
        texts,
      })
    );
  };

  return (
    <>
      {cartItems?.length > 0 && (
        <div className='cart-checkout-container'>
          <div className='cart-checkout-wrapper'>
            <div className='box-wrapper'>
              <Link
                to={cleanUrl(
                  `/restaurants/${restaurantInfo?.name}-${restaurantInfo?.locality}-${restaurantInfo?.areaName}-${restaurantInfo?.id}`
                )}
              >
                <div className='cart-checkout-header'>
                  {restaurantInfo?.cloudinaryImageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantInfo?.cloudinaryImageId}`}
                      alt='logo'
                      height={"50px"}
                      width={"50px"}
                      object-fit={"cover"}
                    />
                  )}

                  <div className='cart-checkout-wrapper-title'>
                    <div>{restaurantInfo?.name}</div>
                    <div>{restaurantInfo?.locality}</div>
                  </div>
                </div>
              </Link>
              <div className='cart-item-list'>
                {cartItems.map((item, index) => (
                  <div className='flex-wrapper' key={index}>
                    <div className='name-wrapper'>{item.itemName}</div>
                    <AddButton
                      name={"ADD"}
                      selectedValue={item.quantity}
                      onClick={(quantity) =>
                        addItem({
                          itemName: item.itemName,
                          itemPrice: item.itemPrice,
                          restaurantName: restaurantInfo.name,
                          quantity,
                        })
                      }
                    />
                    <div>
                      {((item.quantity * item.itemPrice) / 1000).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
              <div className='checkout-title' style={{ fontWeight: "bold" }}>
                {"Bill Details"}
              </div>
              <div className='checkout-title'>
                <span>{"Item-total"}</span>
                <span>{totalPrice}</span>
              </div>
              <div className='checkout-title'>
                <span>{"Delivery Fee | 2.4 kms"}</span>
                <span>{0}</span>
              </div>
              <div className='divider' style={{ padding: "0" }} />
              <div className='checkout-title'>
                <span>{"Delivery Tip"}</span>
                <span onClick={handleTip}>
                  {editingTip ? (
                    <input
                      type='number'
                      value={tip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border: "none",
                        float: "right",
                        width: "fit-content",
                        textAlign: "end",
                      }}
                    />
                  ) : tip > 0 ? (
                    tip
                  ) : (
                    <span style={{ color: "red" }}>{"Add Tip"}</span>
                  )}
                </span>
              </div>
              <div className='checkout-title'>
                <span>{"Platform Fee"}</span>
                <span>{10}</span>
              </div>
              <div className='checkout-title'>
                <span>{"GST and Restaurant Charges"}</span>
                <span>{(totalPrice * (8 / 100)).toFixed(1)}</span>
              </div>
            </div>
            <div className='box-wrapper'>
              <div className='flex-wrapper'>
                <div>To Pay</div>
                <div style={{ textAlign: "end" }}>
                  {(
                    totalPrice +
                    totalPrice * (8 / 100) +
                    Number(tip) +
                    10
                  ).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='box-wrapper'>
              <div className='tile-wrapper'>
                <div className='tile-header'>Delivery Address</div>
              </div>
              <input
                type='textArea'
                className='address-input'
                value={deliveryAddress}
                onChange={handleAddressChange}
                placeholder='Enter your delivery address'
              />
            </div>
            <div className='divider' />
            <div
              className='box-wrapper'
              style={{
                cursor: "pointer",
                color: "#ffffff",
                border: "1px solid #fc8019",
                backgroundColor: "#fc8019",
              }}
            >
              <div className='tile-wrapper'>
                <div
                  className='tile-header'
                  onClick={() => {
                    handleOpenDialog({
                      onConfirm: handleCloseDialog,
                      open: true,
                      texts: {
                        messageBody: "You have successfully placed an order.",
                        title: "Thank You",
                      },
                    });
                  }}
                >
                  {`CLICK HERE TO PROCEED FOR PAYMENT (${(
                    totalPrice +
                    totalPrice * (8 / 100) +
                    Number(tip) +
                    10
                  ).toFixed(1)})`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeatureCheckOut;
