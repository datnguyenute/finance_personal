import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { GridMoreVertIcon } from "@mui/x-data-grid";

const AccountCard = () => {
  return (
    <Card sx={{ m: 1, width: 220, display: "inline-block" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <GridMoreVertIcon />
          </IconButton>
        }
        title="Account 1"
      />
      <CardContent>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>35$</Typography>
      </CardContent>
    </Card>
  );
};

const TransactionHeader = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={4}>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total assets
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Infomation of your account
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Accounts
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              All your accounts
            </Typography>
            <Grid display={"block"}>
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />
            </Grid>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TransactionHeader;