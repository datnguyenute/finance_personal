import { Container, Divider } from "@mui/material";
import TransactionBody from "@/components/transactions/transactions.body";
import TransactionHeader from "@/components/transactions/transactions.header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendRequest } from "@/utils/api";

const  TransactionsPage = async () => {
  const session = await getServerSession(authOptions);
  // console.log('>> session: ', session);

  const res = await sendRequest<any>({
    url: `${process.env.BACKEND_URL}/accounts/by-user`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${session?.access_token}`
    },
  });
  console.log(res);
  
  return (
    <>
      <Container fixed>
        <TransactionHeader />
        <Divider sx={{my: 2}}/>
        <TransactionBody />
      </Container>
    </>
  );
};

export default TransactionsPage;
