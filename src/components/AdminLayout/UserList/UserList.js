import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MaterialTable from "material-table";
import moment from "moment";
import Multiselect from "multiselect-react-dropdown";
import { api } from "../../../utils/Api";
import { successToast } from "../../Toastify/Toastify";
import "./UserList.css";
import UserService from "../../../utils/UserService";

const useStyles = makeStyles((theme) => ({
  datagrid: {
    borderRadius: theme.spacing(2),
  },
  rolesGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  const [roles, setRoles] = useState([]);

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    api
      .getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {});
    api
      .getRoles()
      .then(({ data }) => {
        setRoles(data);
      })
      .catch((err) => {});
  };

  const columns = [
    {
      field: "key",
      title: "ID",
      editable: "never",
    },
    {
      field: "username",
      title: "Username",
      render: (rowData) => (
        <Grid className="userListUser">
          <Avatar
            className="userListImg"
            src={
              `${window.location.origin}/` +
              UserService.findAvatarById(rowData.avatarId)?.path
            }
            alt=""
          />
          {rowData.username}
        </Grid>
      ),
      validate: (rowData) =>
        rowData.username === undefined || rowData.username === ""
          ? "Username is required."
          : true,
    },
    {
      field: "roles",
      title: "Roles",
      editComponent: (tableData) => (
        <Multiselect
          style={{
            chips: { backgroundColor: "rgb(86, 100, 210)" },
            searchBox: {
              border: "1px solid rgb(86, 100, 210)",
              borderRadius: "16px",
            },
            option: {
              backgroundColor: "rgb(86, 100, 210)",
              borderRadius: "16px",
            },
            optionContainer: {
              borderRadius: "16px",
              border: "none",
              color: "white",
              backgroundColor: "rgb(86, 100, 210)",
            },
          }}
          placeholder="Select Role"
          options={roles} // Options to display in the dropdown
          selectedValues={tableData.rowData.roles} // Preselected value to persist in dropdown
          onSelect={(newRoles) => (tableData.rowData.roles = newRoles)} // Function will trigger on select event
          onRemove={(newRoles) => (tableData.rowData.roles = newRoles)} // Function will trigger on remove event
          isObject={false}
        />
      ),
      render: (rowData) => (
        <Grid className={classes.rolesGrid}>
          {rowData.roles.map((role) => (
            <Chip
              style={{
                marginBottom: "5px",
                backgroundColor: "rgb(86, 100, 210)",
                color: "white",
              }}
              key={role}
              label={role}
            />
          ))}
        </Grid>
      ),
    },
    {
      field: "email",
      title: "Email",
      validate: (rowData) =>
        regex.test(rowData.email) ? true : "Email is required.",
    },
    {
      field: "password",
      title: "Password",
    },
    {
      field: "active",
      title: "Status",
      render: (rowData) => (
        <Grid>
          {rowData.active === true ? (
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
        </Grid>
      ),
      editable: "never",
    },
    {
      field: "modifiedBy",
      title: "Modified By",
      editable: "never",
    },
    {
      field: "modified",
      title: "Modified At",
      render: (rowData) =>
        moment(rowData.modified).format("DD/MM/YYYY [at] h:mm A"),
      editable: "never",
    },
    {
      field: "createdBy",
      title: "Created By",
      editable: "never",
    },
    {
      field: "created",
      title: "Created At",
      render: (rowData) =>
        moment(rowData.dateCreated).format("DD/MM/YYYY [at] h:mm A"),
      editable: "never",
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
      </Grid>
      <Grid container className={classes.containergrid}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <MaterialTable
              style={{ borderRadius: "16px", minWidth: "215px" }}
              title="Users"
              data={users}
              columns={columns}
              editable={{
                onRowAdd: (newUser) =>
                  new Promise((resolve, reject) => {
                    api
                      .saveUser(newUser)
                      .then((response) => {
                        successToast(
                          "Congratulations! User has been successfully created."
                        );
                        getAllUsers();
                        resolve();
                      })
                      .catch((err) => {
                        resolve();
                      });
                  }),
                onRowDelete: (oldUser) =>
                  new Promise((resolve, reject) => {
                    api
                      .deleteUser(oldUser.key)
                      .then((response) => {
                        successToast(
                          "Congratulations! User has been successfully deleted."
                        );
                        getAllUsers();
                        resolve();
                      })
                      .catch((err) => {
                        resolve();
                      });
                  }),
                onRowUpdate: (newUser, oldUser) =>
                  new Promise((resolve, reject) => {
                    api
                      .updateUser(oldUser.key, newUser)
                      .then((response) => {
                        successToast(
                          "Congratulations! User has been successfully updated."
                        );
                        getAllUsers();
                        resolve();
                      })
                      .catch((err) => {
                        resolve();
                      });
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                addRowPosition: "first",
                // filtering: true,
                pageSizeOptions: [2, 5, 8, 10, 20, 50, 100],
                pageSize: 5,
                paginationType: "stepped",
                exportButton: true,
                exportAllData: true,
                // selection: true,
                grouping: true,
                columnsButton: true,
                tableLayout: "auto",
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserList;
