import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InitialDataContext } from "../context/InitialDataContext";
import { UilSortAmountDown, UilSortAmountUp } from "@iconscout/react-unicons";

import ProductCard from "./components/ProductCard";
const Collection = () => {
  const { id } = useParams();
  const { groupedProductList, categoryList } = useContext(InitialDataContext);
  //map over category and get witch category we are in
  const categoryName = categoryList.filter((item) => item.id === id);
  // setup the sort option
  const [sortType, setSortType] = useState("LowerFirst");
  //  sort groupedProductList by price
  const handleSort = (sortType) => {
    setSortType(sortType); // update the sort type state

    //  sort and check if product has discount compare with it else compare with the price

    if (sortType === "HigherFirst") {
      groupedProductList[id].sort((a, b) => {
        if (a.data.discount) {
          if (b.data.discount) {
            return b.data.discount - a.data.discount;
          } else {
            return b.data.price - a.data.discount;
          }
        } else {
          if (b.data.discount) {
            return b.data.discount - a.data.price;
          } else {
            return b.data.price - a.data.price;
          }
        }
      });
    } else {
      groupedProductList[id].sort((a, b) => {
        if (a.data.discount) {
          if (b.data.discount) {
            return a.data.discount - b.data.discount;
          } else {
            return a.data.discount - b.data.price;
          }
        } else {
          if (b.data.discount) {
            return a.data.price - b.data.discount;
          } else {
            return a.data.price - b.data.price;
          }
        }
      });
    }
  };
  // sort the product list

  return (
    <div className="bg-white mx-1">
      <div className="mx-auto max-w-2xl px-2 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">
          {categoryList &&
            categoryList.map((item) => {
              if (item.id === id) {
                return (
                  <div className="flex justify-between items-center">
                    <p key={item.id}>{item.data}</p>
                    <div className="flex items-center">
                      <p className=" text-base">Sort by price:</p>
                      <p
                        className={
                          sortType === "HigherFirst"
                            ? "bg-gray-200 p-1 border rounded-md mx-1 cursor-pointer"
                            : " p-1 border rounded-md mx-1 cursor-pointer"
                        }
                        onClick={() => handleSort("HigherFirst")}
                      >
                        <UilSortAmountUp />
                      </p>
                      <p
                        className={
                          sortType === "LowerFirst"
                            ? "bg-gray-200 p-1 border rounded-md mx-1 cursor-pointer"
                            : " p-1 border rounded-md mx-1 cursor-pointer"
                        }
                        onClick={() => handleSort("LowerFirst")}
                      >
                        <UilSortAmountDown />
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 txt-size">
          {groupedProductList &&
            id &&
            groupedProductList[id] &&
            groupedProductList[id].map((product) => (
              <ProductCard
                product={product}
                CurrentCat={groupedProductList[id]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
