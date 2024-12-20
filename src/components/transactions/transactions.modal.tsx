import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useSnackbar } from "@/utils/snackbar.wrapper";
import { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

interface ITransactionsModalProps {
  open: boolean;
  accounts: IAccount[];
  close: () => void;
  fetch: () => void;
  fetchAccount: () => void;
}

const TransactionsModal = (props: ITransactionsModalProps) => {
  const { data: session } = useSession();
  const { showSnackbar } = useSnackbar();
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
  const { open, close, fetch, accounts, fetchAccount } = props;

  const { register, handleSubmit, reset, setValue } = useForm<any>();

  useEffect(() => {
    if (open) {
      const current = dayjs();
      setCurrentDate(current);
      // Set to form
      const currentDate = current.format("YYYY-MM-DD HH:mm:ss");
      setValue("date", currentDate);
    }
  }, [open]);

  const onSubmitForm: SubmitHandler<any> = async (data) => {
    console.log(">> data submit: ", data);

    // Submit
    if (session) {
      const response = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: {
          type: data.type,
          category: data.category,
          date: data.date,
          amount: data.amount,
          description: data.description,
          accountId: data.accountId,
        },
      });

      console.log(">> res: ", response);
      if (response.data) {
        // Success re fetch data
        showSnackbar("Create transaction success", "success");
        reset();
        fetch();
        fetchAccount();
        close();
      }
    }
  };

  const handleChangeDate = (value: any) => {
    const newDate = value.format("YYYY-MM-DD HH:mm:ss");
    setValue("date", newDate);
  };

  return (
    <Modal open={open} onClose={() => close()}>
      <>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h2">
                Create new transactions
              </Typography>
              <Button variant="contained" sx={{ minWidth: "20px", padding: "2px" }} onClick={() => props.close()}>
                <CloseIcon />
              </Button>
            </Grid>

            <Grid display="flex" flexDirection="column" rowGap={2} py={2}>
              <FormControl fullWidth>
                <InputLabel id="transaction-modal-account">Account</InputLabel>
                <Select
                  labelId="transaction-modal-account"
                  id="transaction-modal-account-select"
                  label="Account"
                  value={accounts && accounts.length > 0 && accounts[0]._id}
                  {...register("accountId")}
                >
                  {accounts.length > 0 ? (
                    accounts.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="transaction-modal-type">Type</InputLabel>
                <Select
                  labelId="transaction-modal-type"
                  id="transaction-modal-type-select"
                  label="Type"
                  value="Income"
                  {...register("type")}
                >
                  <MenuItem value={"Income"}>Income</MenuItem>
                  <MenuItem value={"Expense"}>Expense</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="transaction-modal-category">Category</InputLabel>
                <Select
                  labelId="transaction-modal-category"
                  id="transaction-modal-category-select"
                  label="Category"
                  value={"Online Subscription"}
                  {...register("category")}
                >
                  <MenuItem value={"Online Subscription"}>Online Subscription</MenuItem>
                  <MenuItem value={"Groceries"}>Groceries</MenuItem>
                  <MenuItem value={"Salary"}>Salary</MenuItem>
                  <MenuItem value={"Refund"}>Refund</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="transaction-modal-amount">Amount</InputLabel>
                <OutlinedInput
                  id="transaction-modal-amount"
                  startAdornment={<InputAdornment position="start">đ</InputAdornment>}
                  label="Amount"
                  {...register("amount")}
                />
              </FormControl>
              <FormControl fullWidth>
                <DateTimePicker defaultValue={dayjs()} onChange={handleChangeDate} />
              </FormControl>
              <FormControl fullWidth>
                <TextField label="Description" variant="outlined" {...register("description")} />
              </FormControl>
            </Grid>

            <Grid display="flex" flexDirection="row" justifyContent="end" alignItems="center" gap={1}>
              <Button variant="contained" type="submit">
                Create
              </Button>
              <Button variant="outlined" onClick={() => close()}>
                Cancel
              </Button>
            </Grid>
          </form>
        </Box>
      </>
    </Modal>
  );
};

export default TransactionsModal;
