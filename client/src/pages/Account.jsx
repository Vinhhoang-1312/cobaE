import styled from "styled-components";
import Ads from "../components/Ads";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UpdateAccountModal from "../components/cpn/UpdateAccountModal";
import { mobile } from "../responsive";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EditIcon from "@mui/icons-material/Edit";
import { openModal } from "../redux/cpnRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
`;
const MainContainer = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
`;

const Wrapper = styled.div`
  width: 500px;
  margin: auto;
  ${mobile({ width: "90vw" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
  ${mobile({ padding: "0" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  align-items: center;
  max-width: 300px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 0;
  ${mobile({ padding: "0" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 0;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ padding: "0" })}
`;
const Title = styled.h1`
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
  ${mobile({ paddingTop: "20px" })}
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
const Link = styled.a`
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
`;

const Navigation = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: lightgrey;
  &:hover {
    color: black;
  }
  &.active {
    color: black;
  }
`;
const Divider = styled.div`
  height: 25px;
  border: 1px solid lightgrey;
`;
const Category = styled.div`
  flex: 1;
  display: flex;
  margin-right: 30px;
  align-items: center;
  justify-content: flex-end;
  color: grey;
  ${mobile({ flex: "0.75", marginRight: "15px" })}
`;
const Value = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  ${mobile({ flex: "1" })}
`;
const EditButton = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  cursor: pointer;
  transform: scale(0.9);
  &:hover {
    color: black;
  }
  ${mobile({ flex: "0.5" })}
`;
const Header = styled.h2`
  text-align: center;
  margin: 10px auto;
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;
const InfoContainer = styled.div`
  display: flex;
  padding: 15px 0;
  ${mobile({ padding: "10px 0" })};
`;
const InfoText = styled.p`
  ${mobile({ fontSize: "0.8rem" })};
`;

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAccount = useSelector((state) => state.account.currentAccount);
  const handleModal = (type) => dispatch(openModal(type));
  const capitalize = (text) => {
    return text[0]?.toUpperCase() + text?.slice(1);
  };

  return (
    <Container>
      <UpdateAccountModal />
      <Ads />
      <Navbar />
      <MainContainer>
        <Title>Account</Title>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>Back</Text>
            </Action>
          </Left>
          {currentAccount.isAdmin && (
            <Right>
              <Action>
                <Link href="URL of your admin panel">
                  <Text>Admin panel</Text>
                  <ArrowRightAltIcon style={{ marginLeft: "5px" }} />
                </Link>
              </Action>
            </Right>
          )}
        </TextContainer>
        <TextContainer style={{ marginBottom: "30px" }}>
          <Center>
            <Navigation className="active">
              <Text>Account Settings</Text>
            </Navigation>
            <Divider></Divider>
            <Navigation>
              <Text
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Order History
              </Text>
            </Navigation>
          </Center>
        </TextContainer>
        <Wrapper>
          <Header>Account Info</Header>
          <InfoContainer>
            <Category>
              <InfoText>Full Name:</InfoText>
            </Category>
            <Value>
              <InfoText>{capitalize(currentAccount?.fullname)}</InfoText>
            </Value>
            <EditButton>
              <EditIcon onClick={() => handleModal("FullName")} />
            </EditButton>
          </InfoContainer>
          <InfoContainer>
            <Category>
              <InfoText>Phone :</InfoText>
            </Category>
            <Value>
              <InfoText>{currentAccount?.phone}</InfoText>
            </Value>
            <EditButton>
              <EditIcon onClick={() => handleModal("Phone")} />
            </EditButton>
          </InfoContainer>
          <InfoContainer>
            <Category>
              <InfoText>Gmail :</InfoText>
            </Category>
            <Value>
              <InfoText>{currentAccount?.gmail}</InfoText>
            </Value>
            <EditButton>
              <EditIcon onClick={() => handleModal("Gmail")} />
            </EditButton>
          </InfoContainer>

          <InfoContainer>
            <Category>
              <InfoText>Password:</InfoText>
            </Category>
            <Value>
              <InfoText>••••••••••</InfoText>
            </Value>
            <EditButton>
              <EditIcon onClick={() => handleModal("Password")} />
            </EditButton>
          </InfoContainer>
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Account;
