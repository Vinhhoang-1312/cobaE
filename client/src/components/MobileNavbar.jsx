import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AccountMobileModal } from "./cpn/Accountnd";
import { mobile, tablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { MenuList } from "./NavbarLink";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { publicRequest } from "../requestMethods";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
const Container = styled.div`
  z-index: 5;
  display: none;
  width: 100vw;
  ${tablet({ display: "flex" })}
  ${mobile({ display: "flex" })};
`;
const Left = styled.div`
  flex: 1;
  text-align: left;
  margin: auto;
`;
const SearchMainContainer = styled.div`
  flex: 3;
  text-align: right;
  margin: auto;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  margin: auto;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OverlayContainer = styled.div`
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 3;
  left: ${(prop) => prop.left};
  right: ${(prop) => prop.right};
  top: 0;
  background-color: #f8f8f8;
  overflow: auto;
  transition: 0.5s;
`;
const OverlayContent = styled.div`
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;
const OverlayItem = styled.div`
  padding: 8px;
  font-weight: 900;
  text-decoration: none;
  margin: auto;
  width: 50vw;
  border-radius: 40px;
  font-size: 18px;
  color: black;
  cursor: pointer;
  display: block;
  transition: 0.6s;
`;
const Top = styled.div`
  position: absolute;
  color: black;
  top: 15vh;
  cursor: pointer;
  margin: auto;
  text-align: center;
  width: 50vw;
`;

const CloseLeft = styled.div`
  position: absolute;
  cursor: pointer;
  top: 9px;
  left: 7vw;
  color: black;
  font-size: 60px;
  ${mobile({ left: "25px" })}
`;
const Centerleft = styled.div`
  flex: 1;
  justify-content: left;
  display: flex;
  align-items: center;

  ${tablet({ flex: "1" })}
  ${mobile({ flex: "" })}
`;
const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })}
`;

const MenuItem = styled.div`
  font-size: 10px;
  cursor: pointer;
  ${tablet({ fontSize: "12px" })}
  ${mobile({
    paddingLeft: "0",
    justifyContent: "center",
    alignItems: "center",
  })}
`;

const SearchLabel = styled.label`
  display: none;
  font-size: 12px;
  margin-right: 5px;
  border-radius: 20px;
  color: white;

  ${tablet({ display: "block" })} ${mobile({ display: "block" })};
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  width: 60%;

  ${mobile({ width: "90%", marginLeft: "0px" })};
`;

const MobileNavbar = () => {
  const account = useSelector((state) => state.account.currentAccount);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();
  const centerRef = useRef();
  const rightRef = useRef();
  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  //for device width <= 700
  const disableCenterRight = () => {
    if (window.innerWidth <= 700) {
      if (inputRef.current) {
        inputRef.current.style.width = "63.6vw";
      } else if (centerRef.current?.childNodes) {
        centerRef.current.style.opacity = "0";
      } else if (rightRef.current?.childNodes) {
        rightRef.current.style.opacity = "0";
      }
    }
  };

  //for device width <= 700
  const displayCenterRight = () => {
    if (window.innerWidth <= 700) {
      if (inputRef.current) {
        inputRef.current.style.width = "100%";
      } else if (centerRef.current?.childNodes) {
        centerRef.current.style.opacity = "1";
      } else if (rightRef.current?.childNodes) {
        // rightRef.current.style.display = 'flex'
        rightRef.current.style.opacity = "1";
      }
    }
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
      <Left>
        <MenuItem>
          <MenuIcon onClick={handleMenu} />
        </MenuItem>
      </Left>
      <SearchMainContainer>
        <SearchContainer
          style={{
            width: "70%",
            marginLeft: "10px",
            borderRadius: "5px",
            backgroundColor: "#1E0606",
          }}
        >
          <SearchLabel>Search:</SearchLabel>
          <Stack
            spacing={0}
            className="stack"
            sx={{
              width: "250%",
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
                    <div
                      style={{
                        flex: "1",
                        fontSize: "15px",
                        marginLeft: "10px",
                      }}
                    >
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
      </SearchMainContainer>
      <Center onClick={() => navigate("/")}>
        <Logo>Coba</Logo>
        <Centerleft></Centerleft>
      </Center>
      <Right>
        {account !== null ? (
          <MenuItem>
            <AccountMobileModal />
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
      <OverlayContainer
        left={"0"}
        right={"auto"}
        style={openMenu ? { width: "50%" } : { width: "0%" }}
      >
        <CloseLeft>
          <CloseIcon onClick={handleMenu} />
        </CloseLeft>
        <Top>
          <Logo>MENU</Logo>
        </Top>
        {MenuList.map((menu, index) => {
          return (
            <OverlayContent key={index}>
              <OverlayItem
                id={menu.id}
                onClick={() => {
                  navigate(`${menu.path}`);
                }}
              >
                {menu.title}
              </OverlayItem>
            </OverlayContent>
          );
        })}
      </OverlayContainer>
    </Container>
  );
};

export default MobileNavbar;
