"use client";
import Grid from "@mui/material/Grid2";
import ReportHeader from "./report.header";
import ReportBudget from "./report.budget";
import ReportStatistics from "./report.statistics";
import ReportHistory from "./report.history";

const ReportBody = () => {
  return (
    <>
      <ReportHeader />
      <Grid container spacing={4} my={2}>
        <Grid size={8}>
          <ReportStatistics />
          <ReportHistory />
        </Grid>
        <Grid size={4}>
          <ReportBudget />
        </Grid>
      </Grid>
    </>
  );
};

export default ReportBody;