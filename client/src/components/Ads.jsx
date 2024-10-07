import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";

const pulse = keyframes`
  0% {
    background-color: rgb(255, 153, 153);
	}
	50% {
    background-color: rgb(255, 128, 128) ;
	}
	100% {
	
    background-color: rgb(255, 153, 153);
	}
`;

const Container = styled.div`
  height: 30px;
  background-color: white;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: ${pulse} 2s infinite;
  ${mobile({ fontSize: "12px" })};
`;

const Ads = () => {
  return <Container>Get 20% off on selected items</Container>;
};

export default Ads;
