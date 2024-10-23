import { Paper, Typography } from "@mui/material";
import { Gauge, gaugeClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

/**
 * Income/expense
 * Income: 50$
 * Expense: 90$
 * Hover: Bao nhiêu transaction
 */
interface IReportBudgetProps {
  report: ITransactionReport | undefined,
}

const ReportBudget = (props: IReportBudgetProps) => {
  const { report } = props;

  const formattedNumber = (number: number) => {
    return new Intl.NumberFormat('en-US', {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 1,
    }).format(number / 1000000) + 'M';
  }

  return (
    <Paper elevation={8} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5">Your balance flow</Typography>
      <PieChart
        sx={
          {
            width: "100%",
            marginY: 2
          }
        }
        series={[
          {
            
            arcLabel: (item) => `${formattedNumber(item.value)}`,
            data: [
              { id: 0, value: report && report.balanceFlow.income.totalAmount || 0, label: "Income"},
              { id: 1, value: report && report.balanceFlow.expense.totalAmount || 0, label: "Expense"}
            ],
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        height={200}
      />
    </Paper>
  )
}

export default ReportBudget;

