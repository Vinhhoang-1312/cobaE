import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import NewMembers from "../components/NewMembers";
import NewOrders from "../components/NewOrders";
import styled from "styled-components";
import { accountRequest } from "../requestMethods";
import { useEffect, useMemo, useState } from "react";
import { mobile } from "../responsive";

const Container = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;

const Title = styled.h1`
  padding-top: 55px;
  font-family: Fira Sans Condensed;
  padding-bottom: 30px;
  font-weight: 300;
  ${mobile({ padding: "30px 0" })}
`;

const Widgets = styled.div`
  display: flex;
  flex: 1;
  ${mobile({ flexDirection: "column" })}
`;

const Dashboard = () => {
  const [accountStats, setAccountStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await accountRequest.get("/accounts/stats");
        res.data.map((item) =>
          setAccountStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active Account": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <Container>
      <Title>DASHBOARD</Title>
      <FeaturedInfo />
      <Chart
        data={accountStats}
        title="Monthly Accounts"
        grid
        dataKey="Active Account"
      />
      <Widgets>
        <NewMembers />
        <NewOrders />
      </Widgets>
    </Container>
  );
};
export default Dashboard;
