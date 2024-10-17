import { Container, Divider } from "@mui/material";
import TransactionBody from "@/components/transactions/transactions.body";
import TransactionHeader from "@/components/transactions/transactions.header";

const  TransactionsPage = async () => {
 
  return (
    <>
      <Container fixed>
        <TransactionHeader/>
        <Divider sx={{my: 2}}/>
        <TransactionBody />
      </Container>
    </>
  );
};

export default TransactionsPage;
