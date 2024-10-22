import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

const ReportHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid>
        <Typography variant="h6" component="h2">
          Report overview
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Here what's happening in your finance.
        </Typography>
      </Grid>
      <Stack alignItems="center" direction="row" gap={3}>
        <DatePicker
          label="Date from"
          defaultValue={dayjs("2022-04-17")}
        />
        <DatePicker label="Date to" defaultValue={dayjs("2022-04-17")} />
      </Stack>
    </Grid>

  )
}

export default ReportHeader;