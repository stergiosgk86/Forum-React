import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { api } from "../../../../utils/Api";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
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
  paper: {
    borderRadius: theme.spacing(2),
  },
  categoryCreateEditButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
  },
}));

const CategoriesList = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    api
      .getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  };

  const columns = [
    { title: "ID", field: "id", editable: "never" },
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    { title: "Posts", field: "numPosts", editable: "never" },
    { title: "Comments", field: "numComments", editable: "never" },
  ];

  return (
    <Box>
      <Grid className={classes.header}>
        <Typography
          variant="subtitle2"
          component="h1"
          className={classes.headertitle}
        >
          Categories
        </Typography>
        {/* <NavLink to="/dashboard/createcategories" className="navlink">
          <Button
            className={classes.categoryCreateEditButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Create Category
          </Button>
        </NavLink> */}
      </Grid>
      <Grid container className={classes.containergrid}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <MaterialTable
              style={{ borderRadius: "16px" }}
              title="Categories"
              data={categories}
              columns={columns}
              editable={{
                onRowAdd: (newCategory) =>
                  new Promise((resolve, reject) => {
                    api
                      .saveCategory(newCategory)
                      .then((response) => {
                        getAllCategories();
                        resolve();
                      })
                      .catch((err) => {
                        resolve();
                      });
                  }),
                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    // const index = selectedRow.tableData.id;
                    // const updatedRows = [...data];
                    // updatedRows.splice(index, 1);
                    // setData(updatedRows);
                    // resolve();
                  }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    // const index = oldRow.tableData.id;
                    // const updatedRows = [...data];
                    // updatedRows[index] = updatedRow;
                    // setData(updatedRows);
                    // resolve();
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                addRowPosition: "first",
                filtering: true,
                pageSizeOptions: [2, 5, 8, 10, 20, 50, 100],
                pageSize: 5,
                paginationType: "stepped",
                exportButton: true,
                exportAllData: true,
                selection: true,
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

export default CategoriesList;
