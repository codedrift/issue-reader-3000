import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h2">Oh no!</Typography>
            <Typography variant="h4">Something went terribly wrong!</Typography>
            <Link to="/">
              <Button>Take me home</Button>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
