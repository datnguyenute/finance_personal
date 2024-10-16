import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import Grid from "@mui/material/Grid2";
import { GridMoreVertIcon } from "@mui/x-data-grid";

const AccountCard = () => {
  return (
    <Card sx={{ m: 1, width: 210, display: "inline-block" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <GridMoreVertIcon />
          </IconButton>
        }
        title="Account 1"
      />
      <CardContent>
        <Typography sx={{ color: "text.secondary" }} variant="h4">35$</Typography>
      </CardContent>
    </Card>
  );
};

const TransactionHeader = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={4}>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardHeader title={"Total assets"} subheader={"Infomation of your account"} />
          <CardContent>
            <Typography variant="h4">
              45$
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardHeader title={"Accounts"} subheader={"All your accounts"} action={<Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>} />
          <CardContent>
            <Grid display={"block"}>
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
            </Grid>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TransactionHeader;