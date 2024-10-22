"use client";
import Grid from "@mui/material/Grid2";
import ReportHeader from "./report.header";
import ReportBudget from "./report.budget";
import ReportStatistics from "./report.statistics";
import ReportHistory from "./report.history";

interface IReportBodyProps {
  transactions: ITransaction[],
  from: string,
  to: string,
  setFrom: (date: string) => void,
  setTo: (date: string) => void,
}
const ReportBody = (props: IReportBodyProps) => {
  const { from, to, transactions, setFrom, setTo } = props;

  return (
    <>
      <ReportHeader from={from} to={to} setFrom={setFrom} setTo={setTo} />
      <Grid container spacing={4} my={2}>
        <Grid size={8}>
          <ReportStatistics />
          <ReportHistory />
        </Grid>
        <Grid size={4}>
          <ReportBudget transactions={transactions} />
        </Grid>
      </Grid>
    </>
  );
};

export default ReportBody;