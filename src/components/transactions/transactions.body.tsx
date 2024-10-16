"use client"
import { useState } from "react";
import TransactionModal from "./transactions.modal";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import TransactionGrid from "./transactions.grid";

const TransactionBody = () => {
  const [openTransactionsModal, setOpenTransactionModal] = useState(false);
  const onClickNewTransactions = () => {
    setOpenTransactionModal(true);
  };
  return (
    <>
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
      <TransactionModal
        open={openTransactionsModal}
        close={() => setOpenTransactionModal(false)}
      />
    </>
  )
}

export default TransactionBody