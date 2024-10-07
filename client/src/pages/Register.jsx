import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import Wrong from "../components/cpn/Wrong";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Ads from "../components/Ads";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../redux/authRedux";

const Container = styled.div``;
const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;
const Wrapper = styled.div`
  width: 400px;
  padding: 0 20px;
  ${mobile({ width: "300px" })};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;
const Agreement = styled.label`
  display: block;
  padding-left: 15px;
  text-indent: -15px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
`;
const CheckBox = styled.input`
  width: 12px;
  height: 12px;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  text-align: center;
  color: #d9534f;
  font-size: 14px;
  padding: 5px 0;
`;
const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 15px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 10px auto;
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
const Options = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  text-align: center;
  flex-direction: column;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [admin, setAdmin] = useState(true);
  const [password, setPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isFetching, currentAccount, error } = useSelector(
    (state) => state.account
  );

  const checkPassword = () => {
    if (password !== confirmPassword) {
      return false;
    } else if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword() &&
      registerRequest(dispatch, {
        fullname,
        phone,
        gmail,
        password,

        isAdmin: admin,
      });
  };

  useEffect(() => currentAccount && navigate("/"), [currentAccount, navigate]);

  return (
    <Container>
      <Wrong display={error === false ? "none" : "flex"} />
      <Ads />
      <Navbar />
      <MainContainer>
        <Wrapper>
          <Title>BE PART OF Coba FAMILY</Title>
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              placeholder="full name"
              onChange={(e) => setFullName(e.target.value)}
              required
              minLength={7}
            />
            <InputField
              type="email"
              placeholder="gmail"
              onChange={(e) => setGmail(e.target.value)}
              required
              minLength={5}
            />
            <InputField
              type="tel"
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={6}
            />

            <InputField
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <InputField
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
            {password !== "" &&
            confirmPassword !== "" &&
            password !== confirmPassword ? (
              <Error>Password do not match</Error>
            ) : password !== "" && password.length < 8 ? (
              <Error>Password must be at least 8 characters</Error>
            ) : gmail !== "" && gmail.length < 5 ? (
              <Error>Gmail must be at least 5 characters</Error>
            ) : null}
            <Agreement htmlFor="false" style={{ marginTop: "10px" }}>
              <CheckBox
                type="checkbox"
                name="isAdmin"
                value={admin}
                onChange={(prev) => setAdmin((prev) => !prev)}
                id="false"
                required
              />
              I have read and agree to the <Link>Privacy policy</Link> and{" "}
              <Link>Terms</Link> of Coba.
            </Agreement>
            <Button type="submit" disabled={isFetching ? true : false}>
              Register
            </Button>
          </Form>
          <Options
            onClick={() => {
              navigate("/login");
            }}
          >
            Already a member? Click here
          </Options>
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default SignUp;
