import AdjustIcon from "@mui/icons-material/Adjust";
import { Avatar, Box, ListItemAvatar, ListItemButton, TextField, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { formatDistance } from "date-fns";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
import { useLocation, useNavigate } from "react-router-dom";
import { useFuse } from "../hooks/use-fuse.hook";
import { Issue } from "../model/issue.model";

type IssueListProps = {
  issues: Issue[];
};

const fuseOptions: Fuse.IFuseOptions<Issue> = {
  keys: ["title", "body"],
  threshold: 0.3,
  includeScore: true,
  shouldSort: true,
  findAllMatches: true,
};

const limitText = (text: string, maxLength: number) => {
  if (!text) {
    return "";
  }

  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }

  return text;
};

const textSection = (text: string, word: string, maxLength: number) => {
  if (!text) {
    return "";
  }

  const location = text.toLowerCase().indexOf(word.toLowerCase());

  if (location >= 0) {
    const start = Math.max(0, location - 50);

    const end = location + word.length + 50;

    return text.substring(start, end);
  }

  console.log({ location });

  return limitText(text, maxLength);
};

export const IssueList = ({ issues }: IssueListProps) => {
  const [filter, setFilter] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const sortedItems = useMemo(
    () => issues.slice(0).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [issues],
  );

  const filteredList = useFuse<Issue>(sortedItems, filter, { limit: 20 }, fuseOptions);
  const itemsToRender = filter ? filteredList.map((fr) => fr.item) : sortedItems;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setFilter(input || "");
  };

  return (
    <>
      <TextField placeholder="Filter" fullWidth onChange={handleFilterChange} />
      <List>
        {itemsToRender.map((issue) => {
          const date = formatDistance(new Date(issue.createdAt), new Date(), { addSuffix: true });

          const bodyText = filter ? textSection(issue.body, filter, 150) : limitText(issue.body, 150);

          const goToDetail = () => {
            navigate(`${location.pathname}/${issue.number}`);
          };

          return (
            <ListItemButton key={issue.id} onClick={goToDetail} alignItems="flex-start">
              <ListItemAvatar>
                <Box sx={{ position: "relative", paddingBottom: 1 }}>
                  <Avatar src={issue.author.avatar} alt={issue.author.name}/>
                  <AdjustIcon
                    sx={{
                      color: issue.closed ?  "#aa00ff" : "#00c853",
                      position: "absolute",
                      bottom: 0,
                      right: 8,
                      background: "white",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={[filter]}
                    autoEscape={true}
                    textToHighlight={`(${issue.closed ? "closed" : "open"}) ${issue.title}`}
                  />
                }
                secondary={
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} component="span">
                    <Typography variant="subtitle2" component="span">
                      {date}
                    </Typography>
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      searchWords={[filter]}
                      autoEscape={true}
                      textToHighlight={bodyText}
                    />
                  </Box>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};
