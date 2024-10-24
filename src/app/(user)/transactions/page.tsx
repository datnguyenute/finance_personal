import { options } from "@/app/options";
import Transactions from "@/components/transactions/transactions";
import { useSnackbar } from "@/utils/snackbar.wrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const session = await getServerSession(options);
  // const { showSnackbar } = useSnackbar();

  if (!session || session.error) {
    // showSnackbar("No authorize this page! Please login!");

    // redirect to homepage
    redirect("/");
  }
  return (
    <>
      <Transactions />
    </>
  );
};

export default TransactionsPage;
