import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMembers } from "../redux/authRedux";
import { openModal } from "../redux/modalRedux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Table = styled.div`
  margin: 20px auto;
  width: 90vw;
  max-width: 1000px;
  height: 65vh;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
`;
const Action = styled.div`
  margin: 0 10px;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;

const AccountList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const members = useSelector((state) => state.member.members);

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  const handleModal = (type) => {
    console.log(type);
    dispatch(openModal(type));
  };

  const columns = [
    {
      field: "name",
      headerName: "Full Name",
      width: 300,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              params.row.isAdmin && navigate("/account");
            }}
          >
            {params.row.fullname}
          </ListItem>
        );
      },
    },
    {
      field: "email",
      headerName: "Gmail",
      width: 280,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              params.row.isAdmin && navigate("/account");
            }}
          >
            {params.row.gmail}
          </ListItem>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              params.row.isAdmin && navigate("/account");
            }}
          >
            {params.row.phone}
          </ListItem>
        );
      },
    },
    {
      field: "action",
      headerName: "Delete Account",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Action>
              <DeleteOutlineOutlinedIcon
                onClick={() => handleModal(params.row._id)}
              />
            </Action>
          </>
        );
      },
    },
  ];

  return (
    <Table>
      <DataGrid
        rows={members}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8, 16, 40]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </Table>
  );
};
export default AccountList;
