import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
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

interface IProps {
  open: boolean,
  close: () => void,
}

const TransactionsModal = (props: IProps) => {
  const { open } = props;

  return (
    <Modal
      open={open}
      onClose={() => props.close()}
    >
      <>
        <Box sx={style}>
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
              >
                <MenuItem value={10}>Income</MenuItem>
                <MenuItem value={20}>Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="transaction-modal-category">Category</InputLabel>
              <Select
                labelId="transaction-modal-category"
                id="transaction-modal-category-select"
                label="Category"
              >
                <MenuItem value={10}>Online Subscription</MenuItem>
                <MenuItem value={20}>Groceries</MenuItem>
                <MenuItem value={30}>Salary</MenuItem>
                <MenuItem value={40}>Refund</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="transaction-modal-amount">Amount</InputLabel>
              <OutlinedInput
                id="transaction-modal-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
            <FormControl fullWidth>
              <DatePicker defaultValue={dayjs('2024-04-17')} />
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Description" variant="outlined" />
            </FormControl>
          </Grid>

          <Grid display="flex" flexDirection="row" justifyContent="end" alignItems="center" gap={1}>
            <Button variant="contained">Create</Button>
            <Button variant="outlined" onClick={() => props.close()}>Cancel</Button>
          </Grid>
        </Box>
      </>
    </Modal>
  )
}

export default TransactionsModal;