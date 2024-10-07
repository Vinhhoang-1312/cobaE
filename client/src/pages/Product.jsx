import React, { useEffect, useState } from "react";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styled  from "styled-components";
import Ads from "../components/Ads";
import PopularProducts from "../components/PopularProducts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Notifica from "../components/cpn/Notifica";
import Notification from "../components/cpn/Notification";
import Newsletter from "../components/Newsletter";
import { mobile, tablet, bigtablet } from "../responsive";
import { formatAmount } from "../cornering/formatAmount";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
const Container = styled.div``;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  min-width: 50px;
  align-items: flex-start;
  ${tablet({ flex: "1" })}
  ${mobile({ padding: "0", flexWrap: "wrap" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  margin-right: 12%;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ flex: "0.75" })}
  ${mobile({ padding: "0" })}
`;

const TextContainer = styled.div`
  display: flex;
  ${mobile({ padding: "10px 0" })}
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
  ${mobile({ fontSize: "0.8rem" })};
`;

const Action = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
`;
const ImgContainer = styled.div`
  margin: auto;
  align-items: center;
  justify-content: center;
  flex: 1.2;
  ${bigtablet({ flex: "1" })}
  ${tablet({ flex: "1" })}
`;

const Image = styled.img`
  margin: auto;
  align-items: center;
  justify-content: center;
  width: 90%;
  object-fit: cover;
  ${mobile({ marginTop: "20px", width: "100%" })}
`;
const InfoContainer = styled.div`
  flex: 0.8;
  flex-direction: row;
  margin-left: 50px;
  ${bigtablet({ flex: "1", width: "100%", marginLeft: "30px" })}
  ${tablet({ flex: "1", width: "100%", marginLeft: "30px" })}
  ${mobile({ width: "100%", padding: "10px", marginLeft: "0" })}
`;

const Name = styled.h1`
  font-weight: 200;
`;
const Info = styled.h3`
  font-size: 1.1rem;
  margin: 10px 0px;
`;
const Price = styled.h3`
  font-size: 2.4rem;
  margin: 10px 0px;
`;
// const CreditsInfo = styled.div`
//   display: flex;
//   width: 100%;
//   text-align: center;
//   margin-top: 10px;
// `;
// const Credits = styled.p`
//   font-style: italic;
//   font-size: 9px;
//   color: #b8b8b8;
//   margin: 10px auto;
// `;
// const CreditLink = styled.a`
//   font-size: 9px;
//   color: #b8b8b8;
//   transition: all 0.3s;
//   &:hover {
//     transform: scale(1.08);
//     color: black;
//   }
// `;
const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: grey;
  align-items: center;
  margin: 5px 0;
`;
const Description = styled.p`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;
`;
const ChoiceContainer = styled.div`
  width: 90%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  ${tablet({ width: "100%" })}
  ${mobile({ width: "100%" })}
`;

const ChoiceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ChoiceTitle = styled.span`
  font-size: 16px;
  font-weight: 200;
  margin-right: 5px;
`;

// const ColorOutline = styled.div`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   border: 1px solid black;
//   margin: 0px 5px;
//   cursor: pointer;
//   &.active {
//     opacity: 0.8;
//   }
// `;
// const BoxColor = styled.div`
//   width: 28px;
//   height: 28px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   cursor: pointer;
// `;

// const BoxSizes = styled.div`
//   display: flex;
//   margin: 5px;
//   justify-content: center;
//   align-items: center;
//   width: 50px;
//   height: 40px;
//   border: 1px solid #110f12;
//   cursor: pointer;
//   &.active {
//     color: white;
//     background-color: #110f12;
//   }
//   &:hover {
//     color: white;
//     border-color: #110f12;
//     background-color: #110f12;
//   }
// `;
// const AllSize = styled.p`
//   text-align: center;
//   font-size: 1rem;
//   font-weight: 700;
// `;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Quantity = styled.span`
  width: 40px;
  height: 30px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  margin: 0 5px;
  background-color: white;
  color: ${(prop) => prop.color};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: scale(1.2);
`;
const ButtonContainer = styled.div`
  width: 90%;
  ${mobile({ width: "100%" })}
`;
const Button = styled.button`
  font-size: 1rem;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  background-color: rgb(255, 128, 128);
  color: white;
  cursor: pointer;
  width: 80%;
  margin: 10px 0;
  border-radius: 30px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: rgb(138, 1, 5);
  }
  ${tablet({ width: "100%" })}
  ${tablet({ width: "100%", fontSize: "0.85rem" })}
  ${mobile({ width: "100%", padding: "15px 0" })}
`;

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showNotifica, setShowNotifica] = useState(false);
  const [add, setAdd] = useState(false);
  const [remind, setRemind] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const openNotifica = () => {
    setShowNotifica(true);
    document.body.style.overflow = "hidden";
  };

  const handleQuantity = (type) => {
    if (type === "decrease") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      quantity < 10 && setQuantity(quantity + 1);
    }
  };
  const addToCart = () => {
    setAdd(true);
    dispatch(addProduct({ ...product, quantity }));
  };
  return (
    <Container>
      {showNotifica && (
        <Notifica showModal={showNotifica} setShowModal={setShowNotifica} />
      )}
      <Notification open={add} setOpen={setAdd} type="add" />
      <Notification open={remind} setOpen={setRemind} type="remind" />
      <Ads />
      <Navbar />
      <Wrapper>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>back</Text>
            </Action>
          </Left>
        </TextContainer>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Name>{product.name}</Name>
          <Info>/ {product.category}</Info>
          <Price>{formatAmount(product.price)}</Price>
          <ChoiceContainer>
            <ChoiceWrapper></ChoiceWrapper>
          </ChoiceContainer>
          <TextContainer>
            <Right>
              <Action onClick={openNotifica}>
                <NotificationAddOutlinedIcon />
                <Description>Out of stock?</Description>
              </Action>
            </Right>
          </TextContainer>
          <ChoiceContainer>
            <ChoiceWrapper>
              <ChoiceTitle>Quantity</ChoiceTitle>
              <QuantityWrapper>
                <QuantityButton
                  onClick={() => handleQuantity("decrease")}
                  color={quantity === 1 ? "lightgrey" : "#110f12"}
                >
                  <ArrowCircleLeftRoundedIcon />
                </QuantityButton>
                <Quantity>{quantity}</Quantity>
                <QuantityButton
                  onClick={() => handleQuantity("increase")}
                  color={quantity === 50 ? "lightgrey" : "#110f12"}
                >
                  <ArrowCircleRightRoundedIcon />
                </QuantityButton>
              </QuantityWrapper>
            </ChoiceWrapper>
          </ChoiceContainer>
          <ButtonContainer>
            <Button onClick={addToCart}>
              <ShoppingBagOutlinedIcon style={{ marginRight: "10px" }} /> Add to
              cart
            </Button>
          </ButtonContainer>
          <Left>
            <DescriptionContainer>
              <AccessTimeOutlinedIcon />
              <Description>City: 3-5 days, Province: 7-10 days.</Description>
            </DescriptionContainer>
          </Left>
          <Left>
            <DescriptionContainer>
              <LocalShippingOutlinedIcon />
              <Description>Free shipping for all orders in March</Description>
            </DescriptionContainer>
          </Left>
          <Left>
            <DescriptionContainer>
              <GrainOutlinedIcon />
              <Description>Sold and shipped by Coba.com</Description>
            </DescriptionContainer>
          </Left>
          <Left>
            <DescriptionContainer>
              <AssignmentReturnOutlinedIcon />
              <Description>Free 20-Day returns</Description>
            </DescriptionContainer>
          </Left>
        </InfoContainer>
      </Wrapper>
      <PopularProducts description="PEOPLE ALSO VIEW THESE" />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
