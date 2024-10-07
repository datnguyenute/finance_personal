"use client";;
import TransactionModal from "@/components/modals/transaction.modal";
import { Box, Button, Container } from "@mui/material";
import { useState } from "react";

const AccountPage = () => {
  const [openTransactionsModal, setOpenTransactionModal] = useState(false);
  const onClickNewTransactions = () => {
    setOpenTransactionModal(true);
  }
  return (
    <>
      <Container fixed>
        <Box sx={{ height: 'calc(100vh - 64px)', paddingTop: "10px" }}>
          <Button variant="outlined" onClick={() => onClickNewTransactions()}>Create new transactions</Button>
        </Box>
        <TransactionModal open={openTransactionsModal} close={() => setOpenTransactionModal(false)} />
      </Container>
    </>
  )
}

export default AccountPage;