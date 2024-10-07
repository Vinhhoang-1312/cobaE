import React from "react";
import Ads from "../components/Ads";
import Navbar from "../components/Navbar";
import News from "../components/News";
import Categories from "../components/Categories";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router";

const Home = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      <Ads />
      <Navbar />
      <News />
      <Categories />
      <PopularProducts path={path} description="TRENDING PRODUCTS RIGHT NOW" />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
