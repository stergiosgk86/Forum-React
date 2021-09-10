import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../utils/Api";
import Input from "../controls/Input";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { successToast } from "../Toastify/Toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    paper: {
      padding: theme.spacing(2),
    },
  },
  header: {
    backgroundImage: `radial-gradient(circle, rgba(2,0,43,1) 0%, rgba(58,58,185,1) 50%, rgba(102,181,198,1) 100%)`,
    color: "#fff",
  },
}));

const initialValues = {
  title: "",
  description: "",
};

const CreateCategories = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "This field is required.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });

    if ((fieldValues = values))
      return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      api
        .saveCategory(values)
        .then(() => {
          successToast(
            "Congratulations! Your Category has been successfully created."
          );
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // window.alert("Not Validated...");
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return (
    <Box py={5} className="animated fadeInUp">
      <Container maxWidth="sm">
        <Paper elevation={20}>
          <Box p={2} className={classes.header}>
            <Typography variant="h5">Add Category</Typography>
          </Box>
          <Box p={3}>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              autoComplete="off"
            >
              <Box mb={2} display="flex" justifyContent="start">
                <Input
                  autoFocus
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Title"
                  placeholder="Enter Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title}
                />
              </Box>
              <Box display="flex" justifyContent="start">
                <Input
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Description"
                  placeholder="Enter Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={errors.description}
                />
              </Box>
              <Box display="flex" justifyContent="center" flexWrap="wrap">
                <Box display="flex" justifyContent="start" mt={2} mr={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Box>
                <Box display="flex" justifyContent="start" mt={2}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={resetForm}
                    startIcon={<RotateLeftIcon />}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateCategories;
