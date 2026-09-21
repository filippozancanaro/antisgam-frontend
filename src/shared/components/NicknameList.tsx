import { Box, List, ListItem, ListItemIcon, ListItemText, type SxProps, type Theme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import type { ReactNode } from "react";

interface Props {
  nicknames: readonly string[];
  emptyContent: ReactNode;
  maxHeight?: number;
  sx?: SxProps<Theme>;
  "aria-label"?: string;
}

/** Lista scrollabile di nickname con stato vuoto personalizzabile. */
const NicknameList = ({ nicknames, emptyContent, maxHeight = 300, sx, "aria-label": ariaLabel }: Props) => (
  <Box
    sx={{
      maxHeight,
      overflowY: "auto",
      border: 1,
      borderColor: "divider",
      borderRadius: 2,
      p: 1,
      ...sx,
    }}
  >
    {nicknames.length > 0 ? (
      <List dense aria-label={ariaLabel}>
        {nicknames.map((nickname) => (
          <ListItem key={nickname}>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={nickname} />
          </ListItem>
        ))}
      </List>
    ) : (
      emptyContent
    )}
  </Box>
);

export default NicknameList;
