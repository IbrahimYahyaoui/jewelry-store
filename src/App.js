import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import RootLayout from "./Layout/RootLayout";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SpecialOffers from "./pages/SpecialOffers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="collection/:id" element={<Collection />} />
      <Route path="contact" element={<Contact />} />
      <Route path="Details/:id" element={<ProductDetails />} />
      <Route path="specialOffers" element={<SpecialOffers />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<p>Page not found</p>}></Route>
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <Toaster />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
