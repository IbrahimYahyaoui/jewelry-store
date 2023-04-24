import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UilTrashAlt, UilPlus, UilMinus } from "@iconscout/react-unicons";

import { v4 as uuidv4 } from "uuid";
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, setCart, totalPrice } = useContext(CartContext);
  const [counter, setCounter] = useState(0);

  return (
    <div className="pb-20">
      <h1 className=" text-2xl md:text-4xl mx-3">My Cart : </h1>
      {cart.length > 0 ? (
        cart.map((item) => {
          return (
            <div
              key={uuidv4()}
              className="border rounded flex items-center p-2 my-3 mx-3"
            >
              <img src={item.data.ImageList[0]} className="w-16 rounded "></img>
              {/* item data */}
              <div className="flex flex-col md:flex-row justify-between w-full mx-10 items-center">
                {/* name */}
                <p className=" text-sm">{item.data.name}</p>
                {/* option */}

                <div className="flex  border w-fit my-3">
                  {Object.values(item.data.selectedOption).map((option) => {
                    return (
                      <p className=" text-xs  md:text-sm mx-3">{option}</p>
                    );
                  })}
                </div>
                {/* end option */}
                <div className="flex w-60  justify-between">
                  {/* <p>Quantity : {item.data.counter}</p> */}
                  <p className="flex items-center">
                    Quantity : {/* counter */}
                    <div className="text-white flex border-2 rounded md:mr-3 mx-2 ">
                      <button
                        className="w-8 h-10 grid place-items-center rounded bg-button cursor-pointer"
                        onClick={() => {
                          const UpdatedCart = cart.map((CartItem) => {
                            if (CartItem === item) {
                              if (CartItem.data.counter > 1) {
                                CartItem.data.counter -= 1;
                              }
                            }
                            return CartItem;
                          });
                          // console.log();
                          setCart(UpdatedCart);
                          // set local storage
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(UpdatedCart)
                          );
                        }}
                      >
                        {<UilMinus />}
                      </button>
                      <input
                        readOnly
                        className="w-12 text-black  text-center"
                        value={item.data.counter}
                      />
                      <button
                        className="w-8 h-10 grid place-items-center rounded bg-button cursor-pointer"
                        onClick={() => {
                          const UpdatedCart = cart.map((CartItem) => {
                            if (CartItem === item) {
                              CartItem.data.counter += 1;
                              return CartItem;
                            }
                            return CartItem;
                          });
                          // console.log();
                          setCart(UpdatedCart);
                          // set local storage
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(UpdatedCart)
                          );
                        }}
                        // console.log(newCart);
                      >
                        <UilPlus />
                      </button>
                    </div>
                    {/* end Counter */}
                  </p>
                  <button
                    className=" border rounded "
                    onClick={() => {
                      const updatedCart = cart.filter(
                        (cartItem) => cartItem.cartId !== item.cartId
                      );
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                      setCart(updatedCart);
                    }}
                  >
                    <UilTrashAlt />
                  </button>

                  {/* end info */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="w-5/6 border  m-auto h-20 grid place-content-center mt-10 ">
          Cart is empty
        </p>
      )}
      <div className="bg-black fixed bottom-0 w-screen h-16 flex justify-center  md:justify-end  ">
        <div className="text-white  flex items-center md:mr-5   h-full">
          {/* <input
            placeholder="coupon code"
            className="py-2 rounded px-1"
          ></input> */}

          <p className=" flex  text-xl  mx-2 md:text-xl md:flex-row w-fit">
            Total : <p className="pl-2 "> {totalPrice} DT</p>
          </p>
          {cart.length > 0 ? (
            <Link
              to="/checkout"
              className="border p-2 rounded bg-white text-black capitalize "
            >
              proceed to checkout
            </Link>
          ) : (
            <button
              to="/checkout"
              className="border p-2 rounded bg-white text-black capitalize "
            >
              Your cart is empty
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
