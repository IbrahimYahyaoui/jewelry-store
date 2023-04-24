import React, { useContext, useState, Fragment } from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import {
  UilShoppingBag,
  UilAngleDown,
  UilBars,
  UilTimes,
  UilEstate,
  UilPhone,
  UilOkta,
  UilPricetagAlt,
  UilPercentage,
  UilAngleLeft,
} from "@iconscout/react-unicons";
import { Badge, Collapse, Loading } from "@nextui-org/react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { InitialDataContext } from "../../context/InitialDataContext";
import { Dialog, Transition } from "@headlessui/react";
import { CartContext } from "../../context/CartContext";
const Navbar = () => {
  const { cart, totalPrice } = useContext(CartContext);
  // config for Drawer
  const [open, setOpen] = useState(false);
  // data
  const { categoryList } = useContext(InitialDataContext);

  return (
    <div className="w-screen  bg-white">
      <nav className="h-16  border-b-2 w-screen flex items-center justify-between px-2 lg:px-6">
        <div
          onClick={() => {
            setOpen(true);
          }}
          className=" lg:hidden m-2 "
        >
          <UilBars />
        </div>
        <Link to="/">
          <img src={logo} width={"50px"} className="ml-2" />
        </Link>
        {/* navbar item in Desktop */}
        <ul className=" hidden  lg:block ">
          <div className="flex ">
            <Link to="/" className="flex">
              Home
            </Link>
            <Link to="/SpecialOffers" className="ml-4">
              SpecialOffers
            </Link>
            <li className="mx-4">
              <Menu
                menuButton={
                  <MenuButton>
                    <p className="flex items-end">
                      Collection
                      <UilAngleDown />
                    </p>
                  </MenuButton>
                }
                transition
              >
                {categoryList.length > 0 ? (
                  categoryList.map((cat) => {
                    return (
                      <Link to={`collection/${cat.id}`} key={cat.id}>
                        <MenuItem className="capitalize">{cat.data}</MenuItem>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-center">
                    <Loading />
                  </p>
                )}
              </Menu>
            </li>

            <Link to="/contact" className="flex">
              Contact
            </Link>
          </div>
        </ul>
        {/* shop cart  */}
        <Link to="/cart" className="mr-2 border p-2 rounded w-26 flex  z-10 ">
          <div className="mr-2 border-r-2 pr-3">
            <Badge color="error" content={cart && cart.length}>
              <UilShoppingBag className="text-black " />
            </Badge>
          </div>
          <p className=" text-black">
            {totalPrice && totalPrice.toFixed(2)} DT
          </p>
        </Link>
      </nav>
      {/* Drawer */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 sm:-mr-10 sm:pl-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <UilTimes className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-drawer py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          Tunisiatrinkets
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 text-white ml-4">
                        <Link
                          to="/"
                          onClick={() => {
                            setOpen(false);
                          }}
                          className="flex "
                        >
                          <UilEstate className="mr-6 ml-2" /> Home
                        </Link>

                        <Collapse.Group>
                          <Collapse
                            title={
                              <p className="flex items-center">
                                <UilPricetagAlt className="mr-6" />
                                Collections
                              </p>
                            }
                            // subtitle="Browse Collection"
                            arrowIcon={<UilAngleLeft />}
                          >
                            <div className="flex flex-col ml-4">
                              {categoryList &&
                                categoryList.map((cat) => {
                                  return (
                                    <Link
                                      to={`collection/${cat.id}`}
                                      onClick={() => {
                                        setOpen(false);
                                      }}
                                      key={cat.id}
                                      className="my-2 flex items-center capitalize"
                                    >
                                      <p className=" font-bold mr-2">
                                        <UilOkta width="30%" />
                                      </p>
                                      {cat.data}
                                    </Link>
                                  );
                                })}
                            </div>
                          </Collapse>
                        </Collapse.Group>
                        <Link
                          onClick={() => {
                            setOpen(false);
                          }}
                          className="flex"
                          to="/contact"
                        >
                          <UilPhone className="mr-6 ml-4" /> Contact
                        </Link>
                        <Link
                          onClick={() => {
                            setOpen(false);
                          }}
                          className="flex items-center mt-4"
                          to="/SpecialOffers"
                        >
                          <UilPercentage className="mr-6 ml-4" /> SpecialOffers
                        </Link>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Navbar;
