import { FormControl, InputLabel, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

interface IReportHeaderProps {
  from: string,
  to: string
  setFrom: (date: string) => void,
  setTo: (date: string) => void,
}
const ReportHeader = (props: IReportHeaderProps) => {
  const { from, to, setFrom, setTo } = props;

  const handleChangeDateFrom = (value: any) => {
    const date = value.format('YYYY-MM-DD');
    setFrom(date);
  };
  const handleChangeDateTo = (value: any) => {
    const date = value.format('YYYY-MM-DD');
    setTo(date);
  };

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
        {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="report-header-autowidth-label">Type filter</InputLabel>
          <Select
            labelId="report-header-autowidth-label"
            id="report-header-autowidth"
            value={age}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl> */}
        <DatePicker label="Date from" defaultValue={dayjs(from)} onChange={handleChangeDateFrom} />
        <DatePicker label="Date to" defaultValue={dayjs(to)} onChange={handleChangeDateTo} />
      </Stack>
    </Grid>
  )
}

export default ReportHeader;