import { Paper, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

const ReportBudget = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, height: 500 }}>
      <Typography variant="h5">My Budgets</Typography>
      <Gauge
        value={75}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value, valueMax }) => `100$`}
      />
    </Paper>
  )
}

export default ReportBudget;

