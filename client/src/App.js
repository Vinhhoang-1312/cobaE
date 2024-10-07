import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import ScrollToTop from "./cornering/ScrollToTop";
import OrderHistory from "./pages/Orders";
import Order from "./pages/Order";
import Account from "./pages/Account";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const account = useSelector((state) => state.account.currentAccount);
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/" element={<ProductList />}></Route>
          <Route path="/register" element={<Register />} />

          <Route
            exact
            path="/login"
            element={account ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/account"
            element={account === null ? <Navigate to="/login" /> : <Account />}
          ></Route>
          <Route
            path="/orders"
            element={
              account === null ? <Navigate to="/login" /> : <OrderHistory />
            }
          ></Route>
          <Route
            path="/order/:id"
            element={account === null ? <Navigate to="/login" /> : <Order />}
          ></Route>
          <Route
            path="/cart"
            element={account ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/wishlist"
            element={account ? <Wishlist /> : <Navigate to="/login" />}
          />
          <Route
            path="/success"
            element={account ? <Success /> : <Navigate to="/login" />}
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};
export default App;
//
