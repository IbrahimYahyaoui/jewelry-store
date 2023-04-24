import { Input, Textarea } from "@nextui-org/react";
import React, { useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { db } from "../Config";
import { addDoc, collection } from "firebase/firestore";
const Checkout = () => {
  const { cart, totalPrice } = useContext(CartContext);
  const nameRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();
  const handelOrder = () => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const description = descriptionRef.current.value;
    // if (!name || phone.length != 8 || cart.length === 0) {
    //   toast.dismiss();
    //   toast.error("Please fill all the fields ! don't use +216 if exist");
    // }
    //  valid name
    if (
      !name ||
      name.length < 3 ||
      name.length > 20 ||
      /[^a-zA-Z\s]/.test(name)
    ) {
      toast.dismiss();
      toast.error(
        "Please enter a valid name! The name should contain only letters and spaces."
      );
      return;
    }

    //  valid phone number length 8
    if (!phone || phone.length != 8 || isNaN(phone)) {
      toast.dismiss();
      toast.error("Please enter a valid phone number ! length 8");
      return;
    }
    //  valid cart
    if (cart.length === 0) {
      toast.dismiss();
      toast.error("Please add some products to your cart !");
      return;
    }
    //  valid description
    if (description.length > 1000) {
      toast.dismiss();
      toast.error("Please enter a valid description ! length less than 100");
      return;
    }

    const order = {
      name,
      phone,
      description,
      cart,
      totalPrice,
      //  add date of order
      date: new Date().toLocaleString(),
    };
    //  post order to FireStore
    const OrdersCollection = collection(db, "Orders");
    const addCategory = async (url) => {
      try {
        const docRef = await addDoc(OrdersCollection, {
          ...order,
        });
        console.log("Document written with ID: ", docRef.id);
        toast.dismiss();
        toast.success("Order placed successfully !");
        //
        nameRef.current.value = "";
        phoneRef.current.value = "";
        descriptionRef.current.value = "";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    addCategory();
  };
  return (
    <div className="flex flex-col ">
      <div className="mx-4 pb-20">
        <h1 className="text-2xl">Checkout :</h1>
        <div className="flex flex-col w-60 pb-5">
          <Input label="name : *" ref={nameRef}></Input>
          <Input label="phone Number : * " ref={phoneRef}></Input>
          <Textarea label="description" ref={descriptionRef}></Textarea>
        </div>
        <div className="border p-2">
          {cart &&
            cart.map((item) => {
              return (
                <div className="flex items-center justify-between my-2  scroll">
                  <img src={item.data.ImageList[0]} className="w-16 rounded " />
                  <p className="flex">
                    {Object.values(item.data.selectedOption).map((option) => {
                      return (
                        <p className=" text-xs  md:text-sm mx-3">{option}</p>
                      );
                    })}
                  </p>
                  <p>QTe : {item.data.counter}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-black fixed bottom-0 w-screen h-16 flex justify-center  md:justify-end  ">
        <div className="text-white  flex items-center md:mr-5   h-full">
          <p className=" flex  text-md  mx-2 md:text-xl md:flex-row">
            Total : <p className="pl-2 "> {totalPrice} DT</p>
          </p>
          <button
            to="/checkout"
            className="border p-2 rounded bg-white text-black"
            onClick={() => {
              handelOrder();
            }}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
