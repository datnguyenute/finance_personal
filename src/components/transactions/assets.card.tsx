import { Card, CardActions, CardContent, Typography, Button, CardHeader, LinearProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

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
      <CardHeader title={"Total assets"} subheader={`Infomation of your account (${totalAccounts} accounts)`} />
      <CardContent>
        <Typography variant="h4">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalAssets)}
        </Typography>
        {accountPercents.map((item) => {
          return (
            <Grid container alignItems={"center"} mt={2}>
              <Grid size={4}>{item.account.name}</Grid>
              <Grid size={8}>
                <LinearProgress sx={{ height: 12 }} color="secondary" variant="determinate" value={item.percent} />
              </Grid>
              <Divider />
            </Grid>
          );
        })}
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
};

export default TransactionsAssetsCard;