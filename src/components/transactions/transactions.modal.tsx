import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useSnackbar } from "@/utils/snackbar.wrapper";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

interface ITransactionsModalProps {
  open: boolean,
  close: () => void,
  fetch: () => void;
}

const TransactionsModal = (props: ITransactionsModalProps) => {
  const { data: session } = useSession();
  const { showSnackbar } = useSnackbar();
  const { open, close, fetch } = props;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<any>();

  const onSubmitForm: SubmitHandler<any> = async (data) => {
    console.log('>> data submit: ', data);

    // Submit
    if (session) {
      const response = await sendRequest<any>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.access_token}`
        },
        body: {
          type: data.type,
          category: data.category,
          date: data.date,
          amount: data.amount,
          description: data.description,
        },
      });

      console.log('>> res: ', response);
      if (response._id) {
        // Success re fetch data
        showSnackbar("Create transaction success", "success");
        reset();
        fetch();
        close();
      }
    }
  }

  const handleChangeDate = (value: any) => {
    const newDate = value.$d.toISOString().split('T')[0];
    setValue('date', newDate);

  }

  return (
    <Modal
      open={open}
      onClose={() => close()}
    >
      <>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitForm)}>

            <Grid display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h2">
                Create new transactions
              </Typography>
              <Button variant="contained" sx={{ minWidth: "20px", padding: "2px" }} onClick={() => props.close()}><CloseIcon /></Button>
            </Grid>

            <Grid display="flex" flexDirection="column" rowGap={2} py={2}>

              <FormControl fullWidth>
                <InputLabel id="transaction-modal-type">Type</InputLabel>
                <Select
                  labelId="transaction-modal-type"
                  id="transaction-modal-type-select"
                  label="Type"
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
                  {...register("category")}
                >
                  <MenuItem value={"Online Subscription"}>Online Subscription</MenuItem>
                  <MenuItem value={"Groceries"}>Groceries</MenuItem>
                  <MenuItem value={"Salary"}>Salary</MenuItem>
                  <MenuItem value={"40"}>Refund</MenuItem>
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
                <DatePicker defaultValue={dayjs('2024-04-17')} onChange={handleChangeDate} />
              </FormControl>
              <FormControl fullWidth>
                <TextField label="Description" variant="outlined"  {...register("description")} />
              </FormControl>
            </Grid>

            <Grid display="flex" flexDirection="row" justifyContent="end" alignItems="center" gap={1}>
              <Button variant="contained" type="submit">Create</Button>
              <Button variant="outlined" onClick={() => close()}>Cancel</Button>
            </Grid>
          </form>

        </Box>
      </>
    </Modal>
  )
}

export default TransactionsModal;