import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/authRedux";
import Wrong from "../components/cpn/Wrong";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Ads from "./../components/Ads";
import Navbar from "../components/Navbar";
import LoginGoogle from "../components/LoginGoogle";

const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80")
      center;
  background-size: cover;
`;
const MainContainer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Title = styled.h1`
  color: black;
  font-weight: bold;
  margin: 20px auto;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;
const Wrapper = styled.div`
  width: 85vw;
  max-width: 400px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  ${mobile({ width: "300px", flexDirection: "column" })};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const InputField = styled.input`
  flex: 1;
  width: 85%;
  min-width: 40%;
  margin: 10px auto;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid lightgrey;
  ${mobile({ width: "100%" })};
`;
const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 10px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 5px auto;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;
const Agreement = styled.label`
  color: grey;
  width: "85%";
  font-size: 12px;
  text-align: left;
  padding-bottom: 10px;
  display: block;
  margin-left: 60px;
  text-indent: -20px;
  ${mobile({ marginLeft: "25px" })};
`;
const CheckBox = styled.input`
  vertical-align: middle;
  position: relative;
  margin-right: 10px;
  bottom: 1px;
`;
const Options = styled.a`
  margin: 8px 0px;
  font-size: 12px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
// const Error = styled.span`
//   color: red;
// `;
const Login = () => {
  const navigate = useNavigate();

  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.account);
  const handleClick = (e) => {
    e.preventDefault();
    loginRequest(dispatch, { gmail, password });
  };

  return (
    <Container>
      <Wrong display={error === false ? "none" : "flex"} />
      <Ads />
      <Navbar />
      <MainContainer>
        <Wrapper>
          <Title>WELCOME BACK</Title>
          <Form>
            <InputField
              type="text"
              placeholder="gmail"
              onChange={(e) => setGmail(e.target.value)}
              required
            />
            <InputField
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Agreement htmlFor="log" style={{ marginTop: "10px" }}>
              <CheckBox
                type="checkbox"
                id="log"
                style={{ marginRight: "10px" }}
                defaultChecked
              />
              Keep me logged in
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching ? true : false}>
              Login
            </Button>
          </Form>

          <LoginGoogle />

          <Options>Forgot password?</Options>
          <Options
            onClick={() => {
              navigate("/register");
            }}
          >
            Not yet a member? Click here
          </Options>
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Login;
