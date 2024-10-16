"use client";
import TransactionModal from "@/components/modals/transaction.modal";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useState } from "react";
import TransactionHeader from "./transaction.header";
import TransactionGrid from "@/components/grid/transaction.grid";

const AccountPage = () => {
  const [openTransactionsModal, setOpenTransactionModal] = useState(false);
  const onClickNewTransactions = () => {
    setOpenTransactionModal(true);
  };
  return (
    <>
      <Container fixed>
        <Box sx={{ height: "calc(100vh - 64px)", pt: 2 }}>
          <TransactionHeader />
          <Divider sx={{marginY: 2}} />
          <Grid
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="h4">Transaction list</Typography>
            <Button variant="outlined" onClick={() => onClickNewTransactions()}>
              Create new transaction
            </Button>
          </Grid>
          <TransactionGrid />
        </Box>
        <TransactionModal
          open={openTransactionsModal}
          close={() => setOpenTransactionModal(false)}
        />
      </Container>
    </>
  );
};

export default AccountPage;