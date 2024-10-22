import { Paper, Typography } from "@mui/material";
import { Gauge, gaugeClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

const TypeBudget = {
  INCOME: "Income",
  EXPENSE: "Expense"
}
interface IBudget {
  amount: number,
  totalTransactions: number,
  label: string
}

/**
 * Income/expense
 * Income: 50$
 * Expense: 90$
 * Hover: Bao nhiêu transaction
 */
interface IReportBudgetProps {
  transactions: ITransaction[],
}

const ReportBudget = (props: IReportBudgetProps) => {
  const { transactions } = props;
  const [reportBudget, setReportBudget] = useState<IBudget[]>([])

  useEffect(() => {
    // Set data report
    const budgetValue = getFromReport(transactions);
    setReportBudget(budgetValue);
  }, [transactions]);

  const getFromReport = (transactions: ITransaction[]): IBudget[] => {
    const budgets: IBudget[] = [];
    Object.values(TypeBudget).forEach(item => {
      const budgetValue = getDataFromType(transactions, item);
      budgets.push(budgetValue);
    });

    return budgets;
  }

  const getDataFromType = (transactions: ITransaction[], type: string): IBudget => {
    const typeTrans = transactions.filter(item => item.type === type);
    const totalTransactions = typeTrans.length;
    const amount = typeTrans.reduce((previousValue, current) => previousValue + current.amount, 0);
    return {
      amount,
      totalTransactions,
      label: type
    }
  }

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
            data: reportBudget.map((item, index) => {
              return {
                id: index,
                value: item.amount,
                label: item.label,
              }
            }),
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        height={200}
      />
    </Paper>
  )
}

export default ReportBudget;

