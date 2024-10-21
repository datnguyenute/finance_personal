import Transactions from "@/components/transactions/transactions";

const TransactionsPage = async () => {
  // const session = await getServerSession(authOptions);
  // if (session && !session.error) {
  //   // redirect to homepage
  //   redirect("/")
  // }

  return (
    <>
      <Transactions />
    </>
  );
};

export default TransactionsPage;
