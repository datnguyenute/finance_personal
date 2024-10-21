"use client";

import { Container, Divider } from "@mui/material";
import TransactionsHeader from "./transactions.header";
import TransactionsBody from "./transactions.body";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";

const Transactions = () => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const fetchData = async () => {
    if (session?.access_token) {
      const data = await sendRequest<IAccount[]>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/by-user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      setAccounts(data || []);
    }
  };
  useEffect(() => {
    fetchData();
  }, [session]);
  return (
    <Container fixed>
      <TransactionsHeader accounts={accounts} fetchAccounts={fetchData} />
      <Divider sx={{ my: 2 }} />
      <TransactionsBody accounts={accounts} fetchAccounts={fetchData} />
    </Container>
  );
};

export default Transactions;
