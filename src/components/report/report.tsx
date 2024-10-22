"use client";

import { Box, Container } from "@mui/material";
import ReportBody from "./report.body";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";

const DefaultTime = {
  oneMonth: 30,
  threeMonth: 90,
};

export const IDateType = {
  MONTH: 0,
  THREE_MONTH: 1,
  YEAR: 2,
  CUSTOM: 3
}

const Report = () => {
  const today = new Date();
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [dateFrom, setDateFrom] = useState<Date>(new Date(new Date().setDate(today.getDate() - DefaultTime.oneMonth)));
  const [dateTo, setDateTo] = useState<Date>(new Date(today));
  const [dateType, setDateType] = useState<number>(IDateType.MONTH);

  useEffect(() => {
    fetchData(dateFrom, dateTo);
  }, [session, dateFrom, dateTo]);

  // Get transactions
  const fetchData = async (dateFrom: Date, dateTo: Date) => {
    if (session?.access_token) {
      const data = await sendRequest<IBackendRes<ITransaction[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/report`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        queryParams: {
          from: formalDate(dateFrom),
          to: formalDate(dateTo),
        },
      });
      setTransactions((data && data.data) || []);
    }
  };

  const formalDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const setDateFromFormal = (value: string) => {
    setDateFrom(new Date(value));
  };
  const setDateToFormal = (value: string) => {
    setDateTo(new Date(value));
  };

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
        <ReportBody
          transactions={transactions}
          from={formalDate(dateFrom)}
          to={formalDate(dateTo)}
          setFrom={setDateFromFormal}
          setTo={setDateToFormal}
        />
      </Container>
    </Box>
  );
};

export default Report;
