import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

interface IReportHeaderProps {
  dataType: number;
  from: Date;
  to: Date;
  setFrom: (date: Date) => void;
  setTo: (date: Date) => void;
  setDataType: (value: number) => void;
}
const ReportHeader = (props: IReportHeaderProps) => {
  const { dataType, setDataType, from, to, setFrom, setTo } = props;

  const handleChangeDateFrom = (value: dayjs.Dayjs | null) => {
    if (value) {
      if (value.isValid() && value.year() >= 2000 && value.year() <= dayjs().year()) {
        setFrom(value.toDate());
      }
    }
  };
  const handleChangeDateTo = (value: dayjs.Dayjs | null) => {
    if (value) {
      if (value.isValid() && value.year() >= 2000 && value.year() <= dayjs().year()) {
        setTo(value.toDate());
      }
    }
  };

  const handleChangeType = (event: SelectChangeEvent<number>) => {
    setDataType(Number(event.target.value));
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
      <Stack alignItems="center" direction={{ xs: "column", sm: "row" }} gap={2}>
        <FormControl sx={{ minWidth: 150, width: { xs: "100%", sm: "auto" } }}>
          <InputLabel id="report-header-autowidth-label">Type filter</InputLabel>
          <Select
            labelId="report-header-autowidth-label"
            id="report-header-autowidth"
            value={dataType}
            onChange={handleChangeType}
            autoWidth
            label="Type filter"
          >
            <MenuItem value={0}>Last month</MenuItem>
            <MenuItem value={1}>Last 6 months</MenuItem>
            <MenuItem value={2}>Last year</MenuItem>
            <MenuItem value={3}>Custom</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          sx={{ width: { xs: "100%", sm: "auto" } }}
          readOnly={dataType !== 3}
          label="Date from"
          defaultValue={dayjs(from)}
          value={dayjs(from)}
          onChange={handleChangeDateFrom}
        />
        <DatePicker
          sx={{ width: { xs: "100%", sm: "auto" } }}
          readOnly={dataType !== 3}
          label="Date to"
          defaultValue={dayjs(to)}
          value={dayjs(to)}
          onChange={handleChangeDateTo}
        />
      </Stack>
    </Grid>
  );
};

export default ReportHeader;
