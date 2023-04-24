import React from "react";
import {
  UilInstagramAlt,
  UilPhoneAlt,
  UilEnvelopeAlt,
} from "@iconscout/react-unicons";
const Contact = () => {
  return (
    <div className="flex  justify-center flex-col items-center border md:mx-20 mx-2 ">
      <h1 className=" text-4xl">Contact</h1>
      <div className="pt-10">
        <a
          href="https://www.instagram.com/tunisiatrinkets/?igshid=YmMyMTA2M2Y%3D"
          className="flex text-xl items-center"
        >
          {/* add size */}
          <UilInstagramAlt size={24} className="mr-2" />
          tunisiatrinkets
        </a>
        <p className="flex text-xl items-center my-4">
          {/* add size */}
          <UilPhoneAlt size={24} className="mr-2" />
          29568966
        </p>
        <p className="flex text-xl items-center">
          {/* add size */}
          <UilEnvelopeAlt size={24} className="mr-2" />
          trinketstunisia2023@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Contact;
