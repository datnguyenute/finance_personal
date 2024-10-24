import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { Email, Fingerprint } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <>
      <List
        sx={{ paddingTop: "57px", width: 300, maxWidth: 360 }}
        subheader={<ListSubheader>Your profile</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText>{session?.user.email}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText>{session?.user.name}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Fingerprint />
          </ListItemIcon>
          <ListItemText>{session?.user._id}</ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default Profile;
