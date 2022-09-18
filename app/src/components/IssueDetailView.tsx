import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import { alpha, Avatar, Button, Card, CardContent, CardHeader, Grid, styled, Typography } from "@mui/material";
import { compareAsc, formatDistance } from "date-fns";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IssueDetail } from "../model/issue.model";


const IssueBody = styled("div")(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.03),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
}));

export const IssueDetailView = () => {
  const { owner, repository, number } = useParams();
  const issue = useLoaderData() as IssueDetail;
  const navigate = useNavigate();

  const goToOverview = () => {
    navigate(`/${owner}/${repository}`);
  };

  const viewOnGithub = () => {
    window.open(`https://github.com/${owner}/${repository}/issues/${number}`, "_blank");
  };

  const sortedComments = issue.comments.slice(0).sort((a,b) => compareAsc(new Date(a.createdAt), new Date(b.createdAt)))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={goToOverview} startIcon={<ArrowBackIcon />}>
              Go to overview
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={viewOnGithub} endIcon={<GitHubIcon />}>
              View on github
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {owner}/{repository}/{number}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h4">{issue.title}</Typography>
              </Grid>
            </Grid>
            <CardHeader
              avatar={<Avatar src={issue.author.avatar} alt={issue.author.name} />}
              title={formatDistance(new Date(issue.createdAt), new Date(), { addSuffix: true })}
              subheader={`by ${issue.author.name}`}
            />
            <CardContent>
              <IssueBody dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}></IssueBody>
            </CardContent>
          </CardContent>
        </Card>
      </Grid>
      {sortedComments.map((c) => (
        <Grid item xs={12} key={c.id}>
          <Card>
            <CardHeader
              avatar={<Avatar src={c.author.avatar} alt={c.author.name} />}
              title={formatDistance(new Date(c.createdAt), new Date(), { addSuffix: true })}
              subheader={`by ${c.author.name}`}
            />
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: c.bodyHTML }}></div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
