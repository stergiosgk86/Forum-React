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
  Avatar,
} from "@material-ui/core";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

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
  userCreateEditButton: {
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
      .catch((err) => {});
  }, []);

  const handleDelete = async (id) => {
    await api.deleteUser(id);
    const newUserList = users.filter((user) => {
      return user.key !== id;
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
            <Avatar className="userListImg" src={params.row.avatar} alt="" />
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
      headerName: "Actions",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <NavLink exact to={`/dashboard/user/${params.row.key}`}>
              <Button
                variant="contained"
                color="primary"
                className={classes.userCreateEditButton}
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
              onClick={() => handleDelete(params.row.key)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 153,
    },
    {
      field: "modified",
      headerName: "Modified At",
      width: 218,
      renderCell: (params) => {
        return (
          <>{moment(params.row.modified).format("MMMM D, YYYY [at] h:mm A")}</>
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 146,
    },
    {
      field: "created",
      headerName: "Created At",
      width: 218,
      renderCell: (params) => {
        return (
          <>{moment(params.row.created).format("MMMM D, YYYY [at] h:mm A")}</>
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
            className={classes.userCreateEditButton}
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
