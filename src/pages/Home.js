import React, { useContext, useEffect, useState } from "react";

import { InitialDataContext } from "../context/InitialDataContext";
import { UilExternalLinkAlt } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import { Loading } from "@nextui-org/react";
const Home = () => {
  const { categoryList, productsList, specialOffers } =
    useContext(InitialDataContext);
  // set array  special offers
  const [specialOffersArray, setSpecialOffersArray] = useState([]);

  // get random special offers
  function getRandomFour(obj) {
    const keys = Object.keys(obj);
    const startIndex = Math.floor(Math.random() * (keys.length - 3));
    const randomKeys = keys.slice(startIndex, startIndex + 4);
    const result = [];
    randomKeys.forEach((key) => {
      result.push(obj[key]); // push the randomly selected objects to the array
    });
    return result;
  }

  useEffect(() => {
    const RandomSpecialOffers = specialOffers
      ? getRandomFour(specialOffers)
      : {};
    console.log(RandomSpecialOffers, typeof RandomSpecialOffers);
    setSpecialOffersArray(RandomSpecialOffers);
  }, [specialOffers]);
  console.log(specialOffersArray);

  return (
    <div className="mx-4">
      <div className="Bg-img rounded-lg  flex h-30 items-end  md:h-80">
        <h1 className=" text-white p-4  text-xl   md:text-3xl   ">
          Discover stunning accessories, meticulously crafted by hand with love
          and care.
        </h1>
      </div>
      {/* all best preview */}
      {specialOffers.length > 0 ? (
        <div className="flex flex-col items-center py-4">
          <h3 className="text-2xl flex items-center  ">
            Today Special Offers{" "}
            <Link
              to="/SpecialOffers"
              className="bg-black flex text-white text-sm  rounded-xl items-center h-6 p-3 m-1"
            >
              more <UilExternalLinkAlt size={12} className="ml-2" />
            </Link>
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 txt-size">
            {specialOffersArray.length > 1 &&
              specialOffersArray.map((product) => (
                <ProductCard product={product} />
              ))}
          </div>
        </div>
      ) : null}
      {/*all Collections preview */}
      {categoryList.length > 0 ? (
        <div className="flex items-center flex-col ">
          <h3 className="text-2xl capitalize">Browse our collections</h3>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5  items-center  ">
            {categoryList &&
              categoryList.map((category) => {
                return (
                  <Link
                    to={`/collection/${category.id}`}
                    className="  cursor-pointer w-30 md:w-48 border rounded overflow-hidden m-2 flex flex-col  md:m-8 items-center"
                  >
                    <section>
                      <img src={category.image} />
                    </section>
                    <div className="pt-2 capitalize  border  w-full text-center ">
                      <p className=" txt-size">{category.data}</p>
                    </div>
                    <div></div>
                  </Link>
                );
              })}
          </div>
        </div>
      ) : (
        <p className="text-center mt-20 ">
          <Loading size="xl" />
        </p>
      )}
    </div>
  );
};

export default Home;
