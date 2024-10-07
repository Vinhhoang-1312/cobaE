import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: #262626;

  color: white;
  margin: auto;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-left: 50px;
  color: white;

  ${tablet({ padding: "20px" })}
  ${mobile({ padding: "20px" })}
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 14px;
`;
const SocialContainer = styled.div`
  align-items: center;
  display: flex;
  ${mobile({ display: "none" })}
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  ${tablet({ padding: "20px" })}
  ${mobile({ padding: "20px" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-size: 14px;
  ${tablet({ marginBottom: "10px", fontSize: "0.85rem" })}
  ${mobile({ marginBottom: "10px", fontSize: "0.85rem" })}
`;
const Title2 = styled.h3`
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 9px;
  font-size: 14px;
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 30px;
  color: white;

  ${tablet({ padding: "20px" })}
  ${mobile({ padding: "0px" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 12px;
  ${tablet({ marginBottom: "10px", flexWrap: "wrap", fontSize: "10px" })}
  ${mobile({ marginBottom: "5px", fontSize: "10px" })}
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  justify-content: center;
  ${tablet({ padding: "20px" })}
  ${mobile({ padding: "20px" })}
`;

const List = styled.ul`
  margin: 0;
  padding-left: 10px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  font-size: 13px;
  margin-bottom: 10px;
  ${tablet({ marginBottom: "5px", flexWrap: "wrap", fontSize: "10px" })}
  ${mobile({ marginBottom: "5px", fontSize: "10px" })}
`;
const Payment = styled.img`
  padding-top: 20px;
  width: 50%;
`;
const Legal = styled.img`
  width: 45%;
`;
const Hr = styled.hr`
  width: 90vw;
  max-width: 1295px;
  margin: auto;
  border: none;
  height: 0.5px;
  background-color: grey;
`;
const Bottom = styled.div`
  font-size: 10px;
  color: white;
  margin: auto;
  padding: 10px 0 20px 0;
  text-align: center;
`;
const MainContainer = styled.div`
  background-color: #110f12;
  color: white;
  margin: auto;
  ${mobile({ flexDirection: "column" })}
`;
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <MainContainer>
      <Container>
        <Left>
          <Logo>Co Ba Mart</Logo>
          <Desc>
            Top 2 e-commerce system in terms of food safety certification,
            according to the assessment from The New York Times voted in 2022
            for the Vietnam region.
          </Desc>
          <Legal src="https://lh6.googleusercontent.com/uO1H-c2PLTh_oyob_fpybQEyOSsRDSrsxFdi12IPXeOjIPb_QkTvnTPqhjNC-9Og9swcMn3M9rh2HTI31DYFse47XQTmlXEGcA9gli8gYMRQxc8bDzWi-hLmNXcgLHTZpT1J1kK4" />
        </Left>
        <Center>
          <Title style={{ marginLeft: "10px" }}>Service</Title>
          <List>
            <ListItem>About Us</ListItem>
            <ListItem>Contact Us</ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem>Help Centre</ListItem>
            <ListItem>Return policy</ListItem>
            <ListItem>FAQ</ListItem>
          </List>
          <Title2>Follow us on</Title2>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px", fontSize: "20px" }} /> 16 Ngo
            Quyen , An Hai Bac , Da Nang
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px", fontSize: "20px" }} /> +1 234
            56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px", fontSize: "20px" }} />{" "}
            cobamart@gmail.com
          </ContactItem>
          <Payment src="https://woodforfuel.com/wp-content/uploads/2017/11/logo-stripe.png" />
        </Right>
      </Container>
      <Hr />

      <Bottom>Copyright &copy; {year} Coba.</Bottom>
    </MainContainer>
  );
};

export default Footer;
