import React, { useState } from "react";
import "./UserList.css";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { userRows } from "../DummyData";

const useStyles = makeStyles((theme) => ({
  datagrid: {
    height: 630,
    width: "100%",
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 220,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <NavLink exact to={"/dashboard/user/" + params.row.id}>
              <Button
                variant="contained"
                color="primary"
                className="userListEdit"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </NavLink>
            <Button
              variant="contained"
              color="secondary"
              className="userListDelete"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid
        className={classes.datagrid}
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default UserList;
