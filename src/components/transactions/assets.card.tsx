import { Card, CardActions, CardContent, Typography, Button, CardHeader, LinearProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { PieChart } from "@mui/x-charts";

interface IAccountPercent {
  account: IAccount;
  percent: number;
}

interface IPropsTransactionsAssetsCard {
  data: IAccount[];
}

const TransactionsAssetsCard = (props: IPropsTransactionsAssetsCard) => {
  const { data } = props;

  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [totalAccounts, setTotalAccounts] = useState<number>(0);
  const [accountPercents, setAccountPercents] = useState<IAccountPercent[]>([]);

  useEffect(() => {
    setTotalAccounts(data.length);
    const totalAssets = calcTotalAsset(data);
    console.log(totalAssets);
    const accountPercents = calcPercents(data);
    setTotalAssets(totalAssets);
    setAccountPercents(accountPercents);
  }, [data]);

  const calcTotalAsset = (accounts: IAccount[]): number => {
    if (accounts.length > 0) {
      return accounts.reduce((prev, curr) => prev + curr.balance, 0);
    }
    return 0;
  };

  const calcPercents = (accounts: IAccount[]): IAccountPercent[] => {
    if (accounts.length > 0) {
      const totals = calcTotalAsset(accounts);
      return accounts.map((item) => {
        return {
          account: item,
          percent: (item.balance / totals) * 100,
        } as IAccountPercent;
      });
    }
    return [];
  };

  return (
    <Card elevation={4} sx={{ mb: 2, mt: 2 }}>
      <CardHeader title={"Available balance"} subheader={`Infomation of your account (${totalAccounts} assets)`} />
      <CardContent>
        <Typography variant="h4">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalAssets)}
        </Typography>
        <PieChart
          series={[
            {
              data: accountPercents.map((item, index) => {
                return { id: index, value: item.percent, label: item.account.name };
              }),
              arcLabel: (item) => `${Math.round(item.value)}%`,
              arcLabelMinAngle: 35,
            },
          ]}
          sx={{
            width: "100%",
            marginTop: "16px",
          }}
          height={200}
        />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default TransactionsAssetsCard;
