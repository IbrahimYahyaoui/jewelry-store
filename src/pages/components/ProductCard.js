import React from "react";
import { UilShoppingCart } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Link
        to={`/Details/${product.id}`}
        className="border p-1 rounded cursor-pointer hover:scale-105 transition-all w-fit flex flex-col items-center  h-72 md:h-fit"
      >
        <img src={product.data.ImageList[0]} width={"450px"} height={"550px"} />
        <section className="flex flex-col w-full   h-full  py-2">
          <p className=" capitalize font-light text-xs text-slate-400 ">
            {product.data.category}
          </p>
          <p className=" capitalize font-semibold font-canada txt-size h-18">
            {product.data.name}
          </p>

          {product.data.discount ? (
            <div className="flex self-end  h-full  ">
              <p className="text-sm capitalize font-light self-end  line-through">
                {product.data.price} DT
              </p>
              <p className="text-xl capitalize ml-2  self-end   ">
                {product.data.discount} DT
              </p>
            </div>
          ) : (
            <p className="text-xl capitalize  self-end   ">
              {product.data.price} DT
            </p>
          )}
        </section>
      </Link>
    </div>
  );
};

export default ProductCard;
