import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/cpnRedux";
import { updateAccountInfo } from "../../redux/authRedux";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Notification from "./Notification";
import CloseIcon from "@mui/icons-material/Close";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  max-height: 400px;
  position: relative;
  background-color: white;
  margin: auto;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  padding: 50px 30px;
  ${mobile({ width: "80%" })};
`;
const Header = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin: 15px 0px;
`;
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: black;
`;
const Form = styled.form`
  margin: auto;
  text-align: center;
`;
const InputContainer = styled.div`
  margin: 30px auto;
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none !important;
  }
  ${mobile({ flex: "5" })}
`;
const Button = styled.button`
  cursor: pointer;
  flex: 1;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  background-color: #110f12;
  color: white;
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;

const UpdateAccountModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const currentAccount = useSelector((state) => state.account.currentAccount);
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdate(true);
    const accountID = currentAccount?._id;
    const accountInput = { ...input };
    setLoading(true);
    updateAccountInfo(accountID, accountInput, dispatch);
    setTimeout(() => {
      updateHelper();
    }, 2000);
  };
  const updateHelper = () => {
    document.getElementById("modalForm").reset();
    setLoading(false);
    dispatch(closeModal());
  };
  const handleClose = () => {
    setInput({});
    dispatch(closeModal());
  };
  const handleInput = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };

  const type = () => {
    if (modal.type === "FullName") {
      return "text";
    } else if (modal.type === "Phone") {
      return "tel";
    } else if (modal.type === "Gmail") {
      return "email";
    } else if (modal.type === "Password") {
      return "password";
    }
  };
  const name = () => {
    if (modal.type === "FullName") {
      return "fullname";
    } else if (modal.type === "Phone") {
      return "phone";
    } else if (modal.type === "Gmail") {
      return "gmail";
    } else if (modal.type === "Password") {
      return "password";
    }
  };

  const placeholder = () => {
    if (modal.type === "FullName") {
      return currentAccount.fullname;
    } else if (modal.type === "Phone") {
      return currentAccount.phone;
    } else if (modal.type === "Gmail") {
      return currentAccount.gmail;
    } else if (modal.type === "Password") {
      return "•••••••••••";
    }
  };
  return (
    <ModalContainer display={modal.open ? "flex" : "none"}>
      <Notification open={update} setOpen={setUpdate} type="update" />
      <FormContainer>
        <CloseButton>
          <CloseIcon onClick={handleClose} />
        </CloseButton>
        <Header>Update Your {modal.type}</Header>
        <Form onSubmit={handleUpdate} id="modalForm">
          <InputContainer>
            <Input
              type={type()}
              name={name()}
              placeholder={placeholder()}
              onChange={handleInput}
              required
              minLength={
                modal.type === "Password"
                  ? 7
                  : modal.type === "Fullname"
                  ? 5
                  : 2
              }
            />
          </InputContainer>

          <Button type="submit" disabled={loading ? true : false}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </ModalContainer>
  );
};

export default UpdateAccountModal;
