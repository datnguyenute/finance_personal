"use client";
import { useEffect, useState } from "react";
import TransactionModal from "./transactions.modal";
import Grid from "@mui/material/Grid2";
import { Box, Button, Paper, Typography } from "@mui/material";
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
      const data = await sendRequest<IBackendRes<IModelPaginate<ITransaction>>>({
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
      setTransactions((data && data.data && data.data.result) || []);
      setTotalCount((data && data.data && data.data.meta && data.data.meta.total) || 0);
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
    <Paper elevation={4} sx={{ padding: 2, marginBottom: 2 }}>

      <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Transactions</Typography>
        <Button variant="contained" color="secondary" onClick={() => onClickNewTransactions()}>
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
    </Paper>
  );
};

export default TransactionsBody;
