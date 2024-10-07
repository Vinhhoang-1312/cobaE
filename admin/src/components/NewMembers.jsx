import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { accountRequest } from "./../requestMethods";
import { mobile, tablet, bigtablet } from "../responsive";
import { useEffect, useState } from "react";

const Container = styled.div`
  flex: 1;
  min-width: 250px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
  ${mobile({ width: "100%" })}
`;
const MemberContainer = styled.div`
  max-height: 300px;
  overflow: hidden;
`;
const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 10px;
  ${bigtablet({ fontSize: "20px" })}
  ${tablet({ fontSize: "18px" })}
  ${mobile({ fontSize: "16px" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
const MemberInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;
const Name = styled.span`
  font-weight: 600;
  ${mobile({ fontSize: "16px" })}
`;

const Email = styled.span`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
  ${mobile({ fontSize: "12px" })}
`;
const Action = styled.div`
  width: 100%;
  text-align: center;
  margin: auto;
  padding-top: 15px;
`;
const Button = styled.button`
  width: 120px;
  border: none;
  background-color: #110f12;
  color: white;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 10px;
`;

const NewMembers = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await accountRequest.get("accounts/?new=true");
        setAccounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAccounts();
  }, []);
  return (
    <Container>
      <Title>New Members</Title>
      <MemberContainer>
        {accounts.map((item) => (
          <List key={item._id}>
            <ListItem>
              <MemberInfo>
                <Name>{item.fullname}</Name>
                <Email>{item.gmail}</Email>
              </MemberInfo>
            </ListItem>
          </List>
        ))}
      </MemberContainer>
      <Action>
        <Button
          onClick={() => {
            navigate("/accounts");
          }}
        >
          View all
        </Button>
      </Action>
    </Container>
  );
};
export default NewMembers;
