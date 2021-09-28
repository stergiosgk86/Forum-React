import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../../../utils/Api";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { successToast } from "../../../Toastify/Toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  textfield: {
    ["& fieldset"]: {
      borderRadius: `16px`,
    },
  },
  container: {
    paddingTop: theme.spacing(10),
  },
  paper: {
    borderRadius: theme.spacing(2),
  },
  cardBottom: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "end",
  },
  saveButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
  },
}));

const schema = yup.object().shape({
  title: yup.string().trim().required("Title is required."),
  description: yup.string().trim().required("Description is required."),
});

const CreateCategories = () => {
  const history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values, e) => {
    e.preventDefault();

    api
      .saveCategory(values)
      .then((response) => {
        successToast(
          "Congratulations! Your Category has been successfully created."
        );
        history.push("/");
      })
      .catch((err) => {});
  };

  const keypress = (e) => {
    if (e.key === "Enter") {
    }
  };

  const resetForm = () => {
    reset({});
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Paper component={Card} elevation={3} className={classes.paper}>
            <CardHeader title="Create Category" />
            <Divider />
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    label="Title"
                    placeholder="Enter Title"
                    name="title"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    className={classes.textfield}
                    onKeyPress={keypress}
                    {...register("title")}
                    error={Boolean(errors.title)}
                    helperText={errors?.title?.message}
                  />

                  <TextField
                    fullWidth
                    autoComplete="off"
                    label="Description"
                    placeholder="Enter Description"
                    name="description"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    className={classes.textfield}
                    onKeyPress={keypress}
                    {...register("description")}
                    error={Boolean(errors.description)}
                    helperText={errors?.description?.message}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box className={classes.cardBottom}>
              <Button
                className={classes.saveButton}
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                className="userListDelete"
                variant="contained"
                size="medium"
                color="secondary"
                onClick={resetForm}
                startIcon={<RotateLeftIcon />}
              >
                Reset
              </Button>
            </Box>
          </Paper>
        </form>
      </div>
    </Container>
  );
};

export default CreateCategories;
