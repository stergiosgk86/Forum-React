import React, { useEffect, useState } from "react";
import { makeStyles, Box, Grid, Typography, Paper } from "@material-ui/core";
import { api } from "../../../../utils/Api";
import MaterialTable from "material-table";
import { successToast } from "../../../Toastify/Toastify";

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
    {
      title: "Title",
      field: "title",
      validate: (rowData) =>
        rowData.title === undefined || rowData.title === ""
          ? "Title is required."
          : true,
    },
    {
      title: "Description",
      field: "description",
      validate: (rowData) =>
        rowData.description === undefined || rowData.description === ""
          ? "Description is required."
          : true,
    },
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
                        successToast(
                          "Congratulations! Category has been successfully created."
                        );
                        getAllCategories();
                        resolve();
                      })
                      .catch((err) => {
                        resolve();
                      });
                  }),
                onRowDelete: (oldCategory) =>
                  new Promise((resolve, reject) => {
                    api
                      .deleteCategory(oldCategory.id)
                      .then((response) => {
                        successToast(
                          "Congratulations! Category has been successfully deleted."
                        );
                        getAllCategories();
                        resolve();
                      })
                      .catch((err) => {
                        resolve();
                      });
                  }),
                onRowUpdate: (newCategory, oldCategory) =>
                  new Promise((resolve, reject) => {
                    api
                      .updateCategory(oldCategory.id, newCategory)
                      .then((response) => {
                        successToast(
                          "Congratulations! Category has been successfully updated."
                        );
                        getAllCategories();
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
