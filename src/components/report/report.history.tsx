import { ArrowForwardRounded, EastOutlined } from "@mui/icons-material";
import { Button, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface IReportHistoryProps {
  report: ITransactionReport | undefined,
}
const ReportHistory = (props: IReportHistoryProps) => {
  const router = useRouter();

  const { report } = props;

  const redirectTo = (link: string) => {
    router.push(link);
  }

  return (
    <Paper elevation={4} sx={{ padding: 2, marginBottom: 2 }}>
      <TableContainer>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h5">Transaction history</Typography>
          <Button
            variant="text"
            size="small"
            aria-label="Go to transaction"
            endIcon={<ArrowForwardRounded />}
            component="a"
            onClick={() => redirectTo('/transactions')}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="subtitle2">Go to transaction</Typography>
          </Button>
        </Stack>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="left">Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="left">Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="left">Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report && report.transactionHistory.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.type}</TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.date.toString()}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  )
}

export default ReportHistory;