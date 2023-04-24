import { createContext, useEffect, useState } from "react";
import { db } from "../Config";
import { collection, getDocs } from "firebase/firestore";

export const InitialDataContext = createContext();

export const InitialDataProvider = ({ children }) => {
  // grouped liste of product depend on category
  const [groupedProductList, setGroupedProductList] = useState([]);
  // specialOffers list of product
  const [specialOffers, setSpecialOffers] = useState([]);
  // import all product data from firestore
  const [productsList, setProductsList] = useState();
  const ProductCollection = collection(db, "products");
  // get All product from firebase
  const GetAllProducts = async () => {
    try {
      const Data = await getDocs(ProductCollection);
      const products = [];
      Data.forEach((doc) => {
        products.push({ data: doc.data(), id: doc.id });
      });

      setProductsList(products);
    } catch (e) {
      console.error("Error fetching categories: ", e);
    }
  };
  // fetch all categories from firebase
  const [categoryList, setCategoryList] = useState([]);
  const CategoryCollection = collection(db, "Category");
  const fetchCategory = async () => {
    try {
      const Data = await getDocs(CategoryCollection);
      const categories = [];
      Data.forEach((doc) => {
        categories.push({
          data: doc.data().name,
          id: doc.id,
          image: doc.data().categoryPicture,
        });
      });
      setCategoryList(categories);
      // console.log(Array.from(categoryList));
    } catch (e) {
      console.error("Error fetching categories: ", e);
    }
  };
  useEffect(() => {
    fetchCategory();
    GetAllProducts();
  }, []);

  useEffect(() => {
    GroupProductByCategory(productsList, categoryList);
  }, [productsList]);

  const GroupProductByCategory = (productsList, categoryList) => {
    const GroupedProject = {};
    categoryList.forEach((item) => {
      GroupedProject[item.id] = productsList.filter((product) =>
        product.data.category.includes(item.data)
      );
    });
    // console.log(GroupedProject);
    setGroupedProductList(GroupedProject);
  };
  //  if the product has discount put it in specialOffers
  useEffect(() => {
    if (productsList) {
      const specialOffers = productsList.filter((item) => item.data.discount);
      setSpecialOffers(specialOffers);
      // console.log(specialOffers);
    }
  }, [productsList]);

  return (
    <InitialDataContext.Provider
      value={{ productsList, categoryList, groupedProductList, specialOffers }}
    >
      {children}
    </InitialDataContext.Provider>
  );
};
