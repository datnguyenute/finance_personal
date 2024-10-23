"use client";

import { Box, Container } from "@mui/material";
import ReportBody from "./report.body";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const IDateType = {
  MONTH: 0,
  THREE_MONTH: 1,
  YEAR: 2,
  CUSTOM: 3
}

const Report = () => {
  const { data: session } = useSession();
  const [report, setReport] = useState<ITransactionReport>();
  const [dateFrom, setDateFrom] = useState<Date>(dayjs().subtract(30, 'day').toDate());
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [dateType, setDateType] = useState<number>(IDateType.MONTH);

  useEffect(() => {
    fetchData(dateFrom, dateTo, dateType);
  }, [session, dateFrom, dateTo, dateType]);

  // Get transactions
  const fetchData = async (dateFrom: Date, dateTo: Date, type: number) => {
    if (session?.access_token) {
      const data = await sendRequest<IBackendRes<ITransactionReport>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/for-report`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        queryParams: {
          from: dateFrom,
          to: dateTo,
          type
        },
      });
      setReport(data.data || undefined);
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

  const setDataTypeCustom = (type: number) => {
    let startDate: Date;
    let endDate: Date = new Date();
    switch (type) {
      case 0: // One month ago (30 days ago)
        startDate = dayjs().subtract(30, 'day').toDate();
        break;
      case 1: // Six months ago (~ 182 days ago)
        startDate = dayjs().subtract(6, 'month').toDate();
        break;
      case 2: // One year ago (365 days ago)
        startDate = dayjs().subtract(1, 'year').add(1, 'day').toDate();
        break;
      default: // Custom date range
        startDate = dayjs().subtract(30, 'day').toDate()
        break;
    }
    setDateFrom(startDate);
    setDateTo(endDate);
    setDateType(type);
  }

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
          setDataType={setDataTypeCustom}
          dataType={dateType}
          report={report}
          from={dateFrom}
          to={dateTo}
          setFrom={setDateFrom}
          setTo={setDateTo}
        />
      </Container>
    </Box>
  );
};

export default Report;
