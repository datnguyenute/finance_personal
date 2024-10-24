import { BarChart } from "@mui/x-charts";

import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatasetElementType } from "@mui/x-charts/internals";

interface IStatisticsDataset {
  income: number;
  expense: number;
  dataKey: string;
  [key: string]: any; // Add an index signature
}
const parseReportToDataset = (
  report: ITransactionReport | undefined
): DatasetElementType<string | number | Date | null | undefined>[] => {
  if (!report) return [];
  const datasetList = report.statistics.data.map((item) => {
    const dataset: IStatisticsDataset = {
      income: item.income.totalAmount,
      expense: item.expense.totalAmount,
      dataKey: item.label,
    };
    return dataset as DatasetElementType<string | number | Date | null | undefined>;
  });
  console.log(">> ", datasetList);
  return datasetList;
};

interface IReportStatisticsProps {
  report: ITransactionReport | undefined;
}

const ReportStatistics = (props: IReportStatisticsProps) => {
  const { report } = props;
  const [dataset, setDataset] = useState<DatasetElementType<string | number | Date | null | undefined>[]>([]);

  useEffect(() => {
    const parseDataset = parseReportToDataset(report);
    setDataset(parseDataset);
  }, [report]);

  const formattedNumber = (number: number) => {
    return (
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 1,
      }).format(number / 1000000) + "M"
    );
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5">Income & Expense statistics</Typography>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "dataKey" }]}
        axisHighlight={{ x: "band" }}
        series={[
          { dataKey: "income", label: "Income" },
          { dataKey: "expense", label: "Expense" },
        ]}
        height={350}
        yAxis={[
          {
            valueFormatter: (value) => {
              return formattedNumber(value); // Format the value to include a dollar sign
            },
          },
        ]}
      />
    </Paper>
  );
};

export default ReportStatistics;
