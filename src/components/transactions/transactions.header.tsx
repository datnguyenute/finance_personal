"use client";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Grid from "@mui/material/Grid2";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import TransactionsAssetsCard from "./assets.card";
import TransactionsAccountModal from "./account.modal";
import { useSnackbar } from "@/utils/snackbar.wrapper";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

interface IAccountCardMenuProps {
  anchorEl: null | HTMLElement;
  close: () => void;
  deleteAccount: () => void;
}

const AccountCardMenu = (props: IAccountCardMenuProps) => {
  const { anchorEl, deleteAccount, close } = props;
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={close}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {/* <MenuItem onClick={close}>Update</MenuItem> */}
      <MenuItem
        onClick={() => {
          close();
          deleteAccount();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

interface IPropsAccountCard {
  data: IAccount;
  fetch: () => void;
}
const AccountCard = (props: IPropsAccountCard) => {
  const { data: session } = useSession();

  const { data, fetch } = props;
  const { showSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteAccount = async (id: string) => {
    console.log("Deleting: ", id);
    // Submit
    const response = await sendRequest<any>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (response.deleted === 1) {
      // Success re fetch data
      showSnackbar("Delete account success", "info");
      fetch();
    } else {
      showSnackbar("Error delete", "error");
    }
  };

  return (
    <Card sx={{ mx: 1, width: 220, display: "inline-block" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <GridMoreVertIcon />
          </IconButton>
        }
        title={
          <Stack alignItems="center" direction="row" fontSize={18} gap={2}>
            <AccountBalanceWalletIcon /> {data.name}
          </Stack>
        }
      />
      <CardContent>
        <Typography sx={{ color: "text.secondary" }} variant="h5">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data.balance)}
        </Typography>
      </CardContent>
      <AccountCardMenu
        key={data._id}
        anchorEl={anchorEl}
        close={handleClose}
        deleteAccount={() => deleteAccount(data._id)}
      />
    </Card>
  );
};

interface ITransactionsHeaderProps {
  accounts: IAccount[];
  fetchAccounts: () => void;
}

const TransactionsHeader = (props: ITransactionsHeaderProps) => {
  const { accounts, fetchAccounts } = props;

  const [openModal, setOpenModal] = useState(false);

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
            <CardHeader
              title={"Accounts"}
              subheader={"All your accounts"}
              action={
                accounts.length < 3 ? (
                  <Fab color="primary" aria-label="add" onClick={() => onClickNewAccount()} hidden={true}>
                    <AddIcon />
                  </Fab>
                ) : (
                  // Limit 3 accounts
                  <></>
                )
              }
            />
            <CardContent sx={{ py: 0 }}>
              <Grid display={"block"}>
                {accounts.length > 0 ? (
                  accounts.map((item) => <AccountCard data={item} key={item._id} fetch={fetchAccounts} />)
                ) : (
                  <>
                    <Card sx={{ m: 1, width: 210, display: "inline-block" }}>
                      <CardContent>
                        <Typography sx={{ color: "text.secondary" }} variant="h4">
                          No data
                        </Typography>
                      </CardContent>
                    </Card>
                  </>
                )}
              </Grid>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </Grid>
      <TransactionsAccountModal open={openModal} close={() => setOpenModal(false)} fetch={fetchAccounts} />
    </>
  );
};

export default TransactionsHeader;
