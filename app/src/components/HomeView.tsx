import { Card, CardContent, Grid, LinearProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { StatusFilter } from "../model/status.model";
import { useAppDispatch, useAppSelector } from "../redux";
import { fetchIssues } from "../redux/slices/issues.slice";
import { IssueList } from "./IssueList";

export const Home = () => {
  const { items, loading } = useAppSelector((state) => state.issues);
  const { owner, repository } = useParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<StatusFilter>("all");

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newStatus: StatusFilter) => {
    if (owner && repository && newStatus) {
      setStatus(newStatus);
      dispatch(
        fetchIssues({
          owner,
          repository,
          status: newStatus,
        }),
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  Issues for {owner}/{repository}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ToggleButtonGroup value={status} exclusive onChange={handleFilterChange} aria-label="issue status">
                  <ToggleButton value="closed" aria-label="closed">
                    CLOSED
                  </ToggleButton>
                  <ToggleButton value="all" aria-label="all">
                    ALL
                  </ToggleButton>
                  <ToggleButton value="open" aria-label="open">
                    OPEN
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>{loading ? <LinearProgress /> : <IssueList issues={items} />}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
