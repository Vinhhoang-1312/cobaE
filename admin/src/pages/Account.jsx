import styled from "styled-components";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EditIcon from "@mui/icons-material/Edit";
import { openModal } from "../redux/modalRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import UpdateAccountModal from "../components/Modal/UpdateAccountModal";

const Container = styled.div``;
const MainContainer = styled.div`
  margin: auto;
  width: 90vw;

  max-width: 1000px;
`;

const Wrapper = styled.div`
  width: 500px;
  margin: auto;
  ${mobile({ width: "90%" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;
const Title = styled.h1`
  padding-top: 55px;
  font-family: Fira Sans Condensed;
  font-weight: 300;
  ${mobile({ paddingTop: "30px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
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
const Category = styled.div`
  flex: 1;
  display: flex;
  margin-right: 30px;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  color: grey;
`;
const Value = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;
const EditButton = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: grey;
  margin-right: 15px;
  cursor: pointer;
  transform: scale(0.9);
  &:hover {
    color: black;
  }
`;
const Header = styled.h2`
  text-align: center;
  margin: 10px auto;
  font-weight: 300;
  font-family: Fira Sans Condensed;
`;
const InfoContainer = styled.div`
  display: flex;
  padding: 15px 0;
`;
const InfoText = styled.p``;

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAccount = useSelector((state) => state.account.currentAccount);
  const adminId = currentAccount._id;
  const admin = useSelector((state) =>
    state.member.members.find((admin) => admin._id === adminId)
  );
  const handleModal = (type) => dispatch(openModal(type));
  const capitalize = (text) => {
    return text[0]?.toUpperCase() + text?.slice(1);
  };

  return (
    <Container>
      <UpdateAccountModal />
      <MainContainer>
        <Title> Admin : {capitalize(admin?.fullname)} </Title>
        <TextContainer style={{ paddingTop: "20px" }}>
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
          <Right></Right>
        </TextContainer>
        <Wrapper>
          <Header>Admin Info</Header>
          <InfoContainer>
            <Category>
              <InfoText>Full Name:</InfoText>
            </Category>
            <Value>
              <InfoText>{capitalize(admin?.fullname)}</InfoText>
            </Value>
            <EditButton>
              <EditIcon onClick={() => handleModal("FullName")} />
            </EditButton>
          </InfoContainer>

          <InfoContainer>
            <Category>
              <InfoText>Phone:</InfoText>
            </Category>
            <Value>
              <InfoText>{admin?.phone}</InfoText>
            </Value>
            <EditButton>
              <EditIcon onClick={() => handleModal("Phone")} />
            </EditButton>
          </InfoContainer>
          <InfoContainer>
            <Category>
              <InfoText>Gmail:</InfoText>
            </Category>
            <Value>
              <InfoText>{admin?.gmail}</InfoText>
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
    </Container>
  );
};

export default Account;
