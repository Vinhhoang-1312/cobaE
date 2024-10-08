import styled from "styled-components";
import ProductItem from "./ProductItem";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  margin: 20px auto;
  max-width: 1290px;
  width: 90vw;
  ${mobile({ padding: "10px" })}
`;
const Wrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  ${mobile({ fontSize: "24px" })}
`;
const PopularProducts = ({ path, description }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          path === "/" ? "products?status" : "products/"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [path]);
  return (
    <Container>
      <Title>{description}</Title>
      <Wrapper>
        {
      //Check Array before render the ProducItem components 
      //This ensures that the map function is only called 
      //when products is an array with at least one item.
          Array.isArray(products) && products.length > 0 &&
          products.slice(0, 8).map((item) => (
      // the products state is initially set to an empty array ([]), 
      //and the map function is called on it in the JSX code.
            <ProductItem item={item} key={item._id} />
          ))}
      </Wrapper>
    </Container>
  );
};

export default PopularProducts;