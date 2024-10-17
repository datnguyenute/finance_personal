"use client"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import Grid from "@mui/material/Grid2";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import TransactionsAssetsCard from "./assets.card";
import TransactionsAccountModal from "./account.modal";

interface IPropsAccountCard {
  data: IAccount
}
const AccountCard = (props: IPropsAccountCard) => {
  const { data } = props;
  return (
    <Card sx={{ m: 1, width: 210, display: "inline-block" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <GridMoreVertIcon />
          </IconButton>
        }
        title={data.name}
      />
      <CardContent>
        <Typography sx={{ color: "text.secondary" }} variant="h4">{data.balance}$</Typography>
      </CardContent>
    </Card>
  );
};

const TransactionsHeader = () => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchData = async () => {
    if (session?.access_token) {
      const data = await sendRequest<IAccount[]>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/by-user`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.access_token}`
        },
      });
      setAccounts(data || []);
    }
  }
  useEffect(() => {
    fetchData();
  }, [session]);

  const onClickNewAccount = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid size={4}>
          <TransactionsAssetsCard data={accounts} />
        </Grid>
        <Grid size={8}>
          <Card sx={{ mb: 2, mt: 2 }}>
            <CardHeader title={"Accounts"} subheader={"All your accounts"} action={
              <Fab color="primary" aria-label="add" onClick={() => onClickNewAccount()}>
                <AddIcon />
              </Fab>} />
            <CardContent>
              <Grid display={"block"}>
                {accounts.length > 0 ?
                  accounts.map(item => <AccountCard data={item} key={item._id} />)
                  :
                  <>
                    <Card sx={{ m: 1, width: 210, display: "inline-block" }}>
                      <CardContent>
                        <Typography sx={{ color: "text.secondary" }} variant="h4">No data</Typography>
                      </CardContent>
                    </Card>
                  </>
                }
              </Grid>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <TransactionsAccountModal open={openModal} close={() => setOpenModal(false)} fetch={() => fetchData()} />
    </>
  );
};

export default TransactionsHeader;