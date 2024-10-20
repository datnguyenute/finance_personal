import { Container, Divider } from "@mui/material";
import TransactionBody from "@/components/transactions/transactions.body";
import TransactionHeader from "@/components/transactions/transactions.header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { sendRequest } from "@/utils/api";

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions);
  // if (session && !session.error) {
  //   // redirect to homepage
  //   redirect("/")
  // }
  const res = await sendRequest<IAccount[]>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/by-user`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const accounts = res || [];

  return (
    <>
      <Container fixed>
        <TransactionHeader />
        <Divider sx={{ my: 2 }} />
        <TransactionBody accounts={accounts} />
      </Container>
    </>
  );
};

export default TransactionsPage;
