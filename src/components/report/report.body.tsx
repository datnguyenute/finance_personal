"use client";
import Grid from "@mui/material/Grid2";
import ReportHeader from "./report.header";
import ReportBudget from "./report.budget";
import ReportStatistics from "./report.statistics";
import ReportHistory from "./report.history";

interface IReportBodyProps {
  report: ITransactionReport | undefined;
  from: Date;
  to: Date;
  dataType: number;
  setFrom: (date: Date) => void;
  setTo: (date: Date) => void;
  setDataType: (value: number) => void;
}
const ReportBody = (props: IReportBodyProps) => {
  const { dataType, setDataType, from, to, report, setFrom, setTo } = props;

  return (
    <>
      <ReportHeader from={from} to={to} setFrom={setFrom} setTo={setTo} dataType={dataType} setDataType={setDataType} />
      <Grid container spacing={4} my={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ReportStatistics report={report} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <ReportBudget report={report} />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <ReportHistory report={report} />
        </Grid>
      </Grid>
    </>
  );
};

export default ReportBody;
