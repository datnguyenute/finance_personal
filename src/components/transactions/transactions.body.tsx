"use client";
import { useEffect, useState } from "react";
import TransactionModal from "./transactions.modal";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import TransactionGrid from "./transactions.grid";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ITransactionsBodyProps {
  accounts: IAccount[];
  fetchAccounts: () => void;
}
const TransactionsBody = (props: ITransactionsBodyProps) => {
  const { accounts, fetchAccounts } = props;
  const router = useRouter();
  const { data: session } = useSession();
  if (session?.error === "RefreshAccessTokenError") {
    console.log({ session });
    router.push("/auth/login");
  }

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [openTransactionsModal, setOpenTransactionModal] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const onClickNewTransactions = () => {
    setOpenTransactionModal(true);
  };

  const fetchData = async (current: number, pageSize: number) => {
    if (session?.access_token) {
      const data = await sendRequest<IModelPaginate<ITransaction>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/by-user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        queryParams: {
          current: current,
          pageSize: pageSize,
        },
      });
      setTransactions(data.result || []);
      setTotalCount(data.meta.total);
    }
  };
  useEffect(() => {
    fetchData(current, pageSize);
  }, [session, current, pageSize]);

  const updatePagination = (current: number, pageSize: number) => {
    setCurrent(current);
    setPageSize(pageSize);
  };

  return (
    <>
      <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Typography variant="h4">Transaction list</Typography>
        <Button variant="outlined" onClick={() => onClickNewTransactions()}>
          Create new transaction
        </Button>
      </Grid>
      <TransactionGrid
        data={transactions}
        updatePagination={updatePagination}
        paginationMeta={{ page: current - 1, pageSize }}
        totalCount={totalCount}
      />
      <TransactionModal
        accounts={accounts}
        open={openTransactionsModal}
        close={() => setOpenTransactionModal(false)}
        fetch={() => fetchData(current, pageSize)}
        fetchAccount={fetchAccounts}
      />
    </>
  );
};

export default TransactionsBody;
