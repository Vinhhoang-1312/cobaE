import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Account from "./pages/Account";
import AllOrders from "./pages/AllOrders";
import AllProducts from "./pages/AllProducts";
import AllAccounts from "./pages/AllAccounts";
import NewProduct from "./pages/NewProduct";
import NewAdmin from "./pages/NewAdmin";
import Order from "./pages/Order";
import Product from "./pages/Product";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./utility/scrollToTop";

const MainContainer = styled.div`
  height: 100vh;
`;
function App() {
  const admin = useSelector((state) => state.account?.currentAccount?.isAdmin);
  return (
    <MainContainer>
      <Navbar />
      <>
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={admin ? <Navigate to="/dashboard" /> : <Login />}
            ></Route>
            {admin && (
              <>
              
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/newadmin" element={<NewAdmin />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/orders" element={<AllOrders />} />
                <Route path="/order/:orderId" element={<Order />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/accounts" element={<AllAccounts />} />
              </>
            )}
          </Routes>
        </ScrollToTop>
      </>
    </MainContainer>
  );
}

export default App;
