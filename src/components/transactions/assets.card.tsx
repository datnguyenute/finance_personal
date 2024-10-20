import { Card, CardActions, CardContent, Typography, Button, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";

interface IPropsTransactionsAssetsCard {
  data: IAccount[]
}

const TransactionsAssetsCard = (props: IPropsTransactionsAssetsCard) => {
  const { data } = props;

  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [totalAccounts, setTotalAccounts] = useState<number>(0);

  useEffect(() => {
    setTotalAccounts(data.length);
    const totalAssets = calcTotalAsset(data);
    console.log(totalAssets);
    setTotalAssets(totalAssets);
  }, [data])

  const calcTotalAsset = (accounts: IAccount[]): number => {
    if (accounts.length > 0) {
      return accounts.reduce((prev, curr) => prev + curr.balance, 0);
    }
    return 0;
  }

  return (
    <Card sx={{ mb: 2, mt: 2 }}>
      <CardHeader title={"Total assets"} subheader={`Infomation of your account (${totalAccounts} accounts)`} />
      <CardContent>
        <Typography variant="h4">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(totalAssets)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default TransactionsAssetsCard