"use client";

import { Box, Container, Divider } from "@mui/material";
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
      const data = await sendRequest<IBackendRes<IAccount[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/by-user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      setAccounts((data && data.data) || []);
    }
  };
  useEffect(() => {
    fetchData();
  }, [session]);
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          pt: { xs: 2, sm: 2 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <TransactionsHeader accounts={accounts} fetchAccounts={fetchData} />
        <TransactionsBody accounts={accounts} fetchAccounts={fetchData} />
      </Container>
    </Box>
  );
};

export default Transactions;