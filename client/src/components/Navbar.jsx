import { Badge } from "@material-ui/core";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import { MenuList } from "./NavbarLink";
import { useNavigate } from "react-router-dom";
import { Accountnd } from "../components/cpn/Accountnd";
import Stack from "@mui/material/Stack";
import "./navbar.css";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  height: 60px;
  background-color: #1e0606;
  color: white;
  ${tablet({ height: "53px" })};
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1290px;
  width: 90vw;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;
const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  color: white;
  font-family: "Oswald";
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })};
`;

const Center = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  width: 60%;
  background-color: white;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const SearchLabel = styled.label`
  display: none;
  font-size: 12px;
  margin-right: 5px;
  border-radius: 20px;
  color: black;
  ${tablet({ display: "block" })}
  ${mobile({ display: "block" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;
const Rightleft = styled.div`
  margin-right: 70px;
  display: flex;

  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;
const Centerleft = styled.div`
  flex: 1;
  justify-content: left;
  display: flex;
  align-items: center;

  ${tablet({ flex: 2 })};

  ${mobile({ display: "none" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  width: 40;
  color: white;
  margin-left: 20px;
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;

const MenuLinks = styled.h3`
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;

  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: -30%;
    width: 0;
    height: 3px;
    background-color: coral;
    transition: width 0.2s ease-out;
  }
  &:hover:before {
    width: 100%;
    left: 0%;
    right: auto;
  }
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;
const Navbar = () => {
  // const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const account = useSelector((state) => state.account.currentAccount);
  const wish = useSelector((state) => state.wish.wishlist);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();
  // const centerRef = useRef();
  // const rightRef = useRef();
  const cartQuantity = useSelector((state) => state.cart.quantity);

  const disableCenterRight = () => {
    inputRef.current.style.width = "27.9vw";
  };

  const displayCenterRight = () => {
    inputRef.current.style.width = "100%";
  };
  useEffect(() => {
    const search = async () => {
      try {
        const res = await publicRequest.get("/products");
        setSearchResults(res.data);
      } catch (err) {
        console.dir(err);
        setSearchResults([]);
      }
    };
    search();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>Co Ba Mart</Logo>
          </Link>
        </Left>

        <Centerleft>
          <SearchContainer
            style={{
              width: "100%",

              borderRadius: "5px",
            }}
          >
            <SearchLabel>Search:</SearchLabel>
            <Stack
              spacing={0}
              className="stack"
              sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              <Autocomplete
                id="search-products"
                freeSolo
                options={searchResults}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <Link
                      to={`/product/${option._id}`}
                      className="link"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        loading="lazy"
                        height={
                          window.innerWidth > 700
                            ? window.innerWidth / 10 + "px"
                            : window.innerWidth / 4 + "px"
                        }
                        src={option.image[0]}
                        alt=""
                        style={{ flex: "1" }}
                      />
                      <div style={{ flex: "1", marginLeft: "10px" }}>
                        {option.name}
                        <br />
                        {option.price} &#8363;
                      </div>
                    </Link>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    ref={inputRef}
                    onFocus={disableCenterRight}
                    onBlur={displayCenterRight}
                    {...params}
                    label="search"
                  />
                )}
              />
            </Stack>
          </SearchContainer>
        </Centerleft>

        <Right>
          <Rightleft>
            {MenuList.map((menu, index) => {
              return (
                <Center key={index}>
                  <MenuLinks
                    id={menu.id}
                    value={menu.title}
                    key={index}
                    onClick={() => {
                      navigate(`${menu.path}`);
                    }}
                  >
                    {menu.title}
                  </MenuLinks>
                </Center>
              );
            })}
          </Rightleft>
          {account !== null && (
            <MenuItem>
              <Badge badgeContent={wish?.length} color="primary">
                <FavoriteBorderOutlinedIcon
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                />
              </Badge>
            </MenuItem>
          )}
          <MenuItem>
            <Badge badgeContent={cartQuantity} color="primary">
              <ShoppingBagOutlinedIcon
                onClick={() => {
                  navigate("/cart");
                }}
              />
            </Badge>
          </MenuItem>
          {account !== null ? (
            <MenuItem>
              <Accountnd />
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </MenuItem>
          )}
        </Right>
        <MobileNavbar />
      </Wrapper>
    </Container>
  );
};

export default Navbar;
