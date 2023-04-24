import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InitialDataContext } from "../context/InitialDataContext";
import { UilPlus, UilMinus } from "@iconscout/react-unicons";
import { CartContext } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const { productsList } = useContext(InitialDataContext);
  const [PreviewedImages, setPreviewedImages] = useState();
  const [optionList, setOptionList] = useState([]);
  const [counter, setCounter] = useState(1);
  const [selectedOption, setSelectedOption] = useState([]);
  //   pick the target Product from the list
  const [currentProduct, setCurrentProduct] = useState();

  const filterProducts = () => {
    {
      productsList.map((product) => {
        if (product.id === id) {
          setCurrentProduct(product);
          setPreviewedImages(product.data.ImageList[0]);
          // setOptionList([
          //   product.data.option1,
          //   product.data.option2,
          //   product.data.option3,
          // ]);
          setAllOption(product);

          return;
        }
      });
    }
  };
  const setAllOption = (product) => {
    const localOptionList = [];
    if (product.data.option1.length !== 0) {
      localOptionList.push(product.data.option1);
    }
    if (product.data.option2.length !== 0) {
      localOptionList.push(product.data.option2);
    }
    if (product.data.option3.length !== 0) {
      localOptionList.push(product.data.option3);
    }
    setOptionList(localOptionList);
  };
  useEffect(() => {
    {
      productsList && filterProducts();
    }
    // filterProducts();
  }, [productsList]);
  //
  const manageList = (optionName, optionParent) => {
    console.log(optionName, optionParent);
    setSelectedOption({
      ...selectedOption,
      [optionParent]: optionName,
    });
  };
  //
  const [finalProduct, setFinalProduct] = useState();
  useEffect(() => {
    currentProduct &&
      setFinalProduct({
        ...currentProduct,
        cartId: uuidv4(),
        data: {
          ...currentProduct.data,
          selectedOption,
          counter,
        },
      });
  }, [selectedOption, counter, currentProduct]);
  const addToCart = () => {
    toast.dismiss();
    console.log(optionList.length);
    if (Object.keys(selectedOption).length !== optionList.length) {
      toast.error("please select all option !");
      return;
    }
    //  if finalProduct in cart with same option show error message if option not the same add to cart
    const isProductInCart = cart.find(
      (product) =>
        product.id === finalProduct.id &&
        JSON.stringify(product.data.selectedOption) ===
          JSON.stringify(finalProduct.data.selectedOption)
    );
    if (isProductInCart) {
      toast.error("this product is already in your cart !");
      return;
    }
    //  add to local storage
    localStorage.setItem("cart", JSON.stringify([...cart, finalProduct]));
    setCart([...cart, finalProduct]);
    toast.success("product added to cart !");
  };

  return (
    <div className=" relative pb-16 ">
      <section className="mx-3  md:flex">
        {/* image preview */}
        <div className="flex flex-col  items-center border  p-2 rounded-md md:w-1/3 h-fit">
          <img src={PreviewedImages && PreviewedImages} className="rounded" />
          {/* sub image preview */}
          <div className="flex pt-2   justify-center">
            {currentProduct &&
              currentProduct.data.ImageList.map((img) => {
                return (
                  <img
                    key={img}
                    src={img}
                    className=" mx-2 rounded w-16  cursor-pointer "
                    onClick={() => {
                      setPreviewedImages(img);
                    }}
                  />
                );
              })}
          </div>
        </div>
        {/* end image preview   */}
        {/* product info */}
        {currentProduct && (
          <div className="flex flex-col  md:w-2/3 md:mx-5 md:pt-10">
            <h1 className="text-2xl">{currentProduct.data.name}</h1>
            <h3 className="text-slate-500">{currentProduct.data.category}</h3>
            <div className=" self-end pt-4">
              {currentProduct.data.discount ? (
                <div className="flex ">
                  <p className="text-md capitalize font-light  line-through">
                    {currentProduct.data.price} DT
                  </p>
                  <p className="text-4xl capitalize ml-2   ">
                    {currentProduct.data.discount} DT
                  </p>
                </div>
              ) : (
                <p className="text-xl capitalize   ">
                  {currentProduct.data.price} DT
                </p>
              )}
            </div>
            <div className="option flex flex-col ">
              {optionList &&
                optionList.map((options) => {
                  return (
                    <div className=" flex flex-col py-2">
                      <h4 className=" ">{options[0]} :</h4>
                      <div className="flex mt-2">
                        {options.slice(1).map((option, index) => {
                          return (
                            <p
                              className="rounded border w-fit px-4 py-1 mx-1 cursor-pointer bg-slate-100"
                              key={index}
                              onClick={() => {
                                manageList(option, options[0]);
                              }}
                              // set the selected option to have border
                              style={{
                                borderColor:
                                  selectedOption &&
                                  selectedOption[options[0]] === option
                                    ? "black"
                                    : "transparent",
                              }}
                            >
                              {option}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
            <p className="py-8">{currentProduct.data.description} </p>
          </div>
        )}
      </section>
      <div className="fixed bottom-0 h-16 bg-drawer   flex items-center  w-screen ">
        <div className="flex items-center justify-between w-full mx-2 md:justify-end md:mr-8">
          <div className="text-white flex border-2 rounded md:mr-3">
            <button
              className="w-8 h-10 grid place-items-center bg-button cursor-pointer"
              onClick={() => {
                counter > 1 && setCounter(counter - 1);
              }}
            >
              {<UilMinus />}
            </button>
            <input
              readOnly
              className="w-12 text-black  text-center"
              value={counter}
            />
            <button
              className="w-8 h-10 grid place-items-center bg-button cursor-pointer"
              onClick={() => {
                setCounter(counter + 1);
              }}
            >
              <UilPlus />
            </button>
          </div>
          <button
            className="p-2 bg-white rounded w-60 text-black "
            onClick={() => {
              addToCart();
            }}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
