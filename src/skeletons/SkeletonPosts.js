import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SkeletonPosts = () => {
  const useStyles = makeStyles((theme) => ({
    header: {
      height: 30,
    },
    media: {
      height: 400,
    },
    paper: {
      padding: theme.spacing(2),
      borderRadius: 10,
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Container component={Box} py={3} style={{ maxWidth: "750px" }}>
        <Card>
          <Grid
            container
            className={classes.header}
            component={Box}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Skeleton animation="wave" height={15} width="40%" />
          </Grid>
          <CardHeader
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="20%"
                style={{ marginBottom: 6 }}
              />
            }
            avatar={
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          {
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.media}
            />
          }

          <CardContent>
            {
              <>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
            }
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SkeletonPosts;
