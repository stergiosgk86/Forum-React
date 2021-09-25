import React, { useEffect, useState } from "react";
import "./UserList.css";
import { NavLink } from "react-router-dom";
import { api } from "../../../utils/Api";
import { DataGrid } from "@material-ui/data-grid";
import { successToast } from "../../Toastify/Toastify";
import {
  makeStyles,
  Button,
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  datagrid: {
    borderRadius: theme.spacing(2),
  },
  paper: {
    borderRadius: theme.spacing(2),
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    await api.deleteUser(id);
    const newUserList = users.filter((user) => {
      return user.id !== id;
    });

    successToast("User has been successfully deleted");
    setUsers(newUserList);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
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
      field: "roles",
      headerName: "Roles",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "active",
      headerName: "Status",
      width: 118,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            {params.row.active === true ? (
              <FiberManualRecordIcon
                fontSize="small"
                style={{ color: "#4caf50" }}
              />
            ) : (
              <FiberManualRecordIcon
                fontSize="small"
                style={{ color: "#d9182e" }}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <NavLink exact to={`/dashboard/user/${params.row.id}`}>
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
          <Paper elevation={3} className={classes.paper}>
            <DataGrid
              className={classes.datagrid}
              autoHeight={true}
              rows={users}
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
