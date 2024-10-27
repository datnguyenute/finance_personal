import { BarChart } from "@mui/x-charts";

import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatasetElementType } from "@mui/x-charts/internals";

interface IStatisticsDataset {
  income: number;
  expense: number;
  dataKey: string;
  [key: string]: any; // Add an index signature
}

interface MapStatisticType {
  [key: string]: number | undefined;
}

enum StatisticsType {
  Amount = "Amount",
  Transactions = "Transactions",
}

const parseReportToDataset = (
  report: ITransactionReport | undefined,
  type: StatisticsType
): DatasetElementType<string | number | Date | null | undefined>[] => {
  if (!report) return [];
  const datasetList = report.statistics.data.map((item) => {
    let typeValue = "";

    switch (type) {
      case StatisticsType.Amount:
        typeValue = "totalAmount";
        break;
      case StatisticsType.Transactions:
        typeValue = "totalTransaction";
        break;
      default:
        typeValue = "totalAmount";
        break;
    }
    const dataset: IStatisticsDataset = {
      income: item.income[typeValue],
      expense: item.expense[typeValue],
      dataKey: item.label,
    };
    return dataset as DatasetElementType<string | number | Date | null | undefined>;
  });
  return datasetList;
};

interface IReportStatisticsProps {
  report: ITransactionReport | undefined;
}

const ReportStatistics = (props: IReportStatisticsProps) => {
  const { report } = props;
  const [dataset, setDataset] = useState<DatasetElementType<string | number | Date | null | undefined>[]>([]);
  const [type, setType] = useState<StatisticsType>(StatisticsType.Amount);

  useEffect(() => {
    const parseDataset = parseReportToDataset(report, type);
    setDataset(parseDataset);
  }, [report, type]);

  const formattedNumber = (number: number) => {
    switch (type) {
      case StatisticsType.Amount:
        return (
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 1,
          }).format(number / 1000000) + "M"
        );
      default:
        return number.toString();
    }
  };

  const handleChangeType = (event: SelectChangeEvent<StatisticsType>) => {
    setType(event.target.value as StatisticsType);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h5">Income & Expense statistics</Typography>
        <FormControl sx={{ minWidth: 150, width: { xs: "100%", sm: "auto" } }}>
          <InputLabel id="report-statistics-type">Type</InputLabel>
          <Select
            labelId="report-statistics-type"
            id="report-statistics-type"
            value={type}
            onChange={handleChangeType}
            label="Type filter"
            size="small"
          >
            <MenuItem value={StatisticsType.Amount}>{StatisticsType.Amount}</MenuItem>
            <MenuItem value={StatisticsType.Transactions}>{StatisticsType.Transactions}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
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
