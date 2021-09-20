import React, { useState } from "react";
import "./UserList.css";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import {
  makeStyles,
  Button,
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { userRows } from "../DummyData";

const useStyles = makeStyles((theme) => ({
  datagrid: {
    height: 630,
    // width: "100%",
  },
  header: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headertitle: {
    fontSize: "2rem",
    fontWeight: 600,
  },
  containergrid: {
    padding: 20,
  },
  userUpdateButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
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
                className={classes.userUpdateButton}
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
    <Box>
      <Grid className={classes.header}>
        <Typography
          variant="subtitle2"
          component="h1"
          className={classes.headertitle}
        >
          Users
        </Typography>
        <NavLink to="/dashboard/newUser" className="navlink">
          <Button
            className={classes.userUpdateButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Create User
          </Button>
        </NavLink>
      </Grid>
      <Grid container className={classes.containergrid}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <DataGrid
              className={classes.datagrid}
              rows={data}
              columns={columns}
              pageSize={10}
              checkboxSelection
              disableSelectionOnClick
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserList;
