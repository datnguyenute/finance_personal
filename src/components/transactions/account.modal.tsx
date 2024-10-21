import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useSnackbar } from "@/utils/snackbar.wrapper";
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

interface ITransactionsAccountModalProps {
  open: boolean;
  close: () => void;
  fetch: () => void;
}

const TransactionsAccountModal = (props: ITransactionsAccountModalProps) => {
  const { data: session } = useSession();
  const { showSnackbar } = useSnackbar();
  if (session?.error === "RefreshAccessTokenError") {
    console.log({ session })
  }

  const { open } = props;
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IAccount>();

  const onSubmitForm: SubmitHandler<IAccount> = async (data) => {
    console.log('>> data submit: ', data);
    // Submit

    if (session) {
      const response = await sendRequest<IBackendRes<IAccount>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.access_token}`
        },
        body: {
          name: data.name,
          balance: data.balance,
        },
      });

      console.log('>> res: ', response);
      if (response.data) {
        showSnackbar("Create account success", "success");

        // Success re fetch data
        reset();
        props.fetch();
        props.close();
      }
    }

  }

  return (
    <Modal open={open} onClose={() => props.close()}>
      <>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitForm)}>

            <Grid display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h2">
                Create new accounts
              </Typography>
              <Button variant="contained" sx={{ minWidth: "20px", padding: "2px" }} onClick={() => props.close()}>
                <CloseIcon />
              </Button>
            </Grid>

            <Grid display="flex" flexDirection="column" rowGap={2} py={2}>
              <FormControl fullWidth>
                <TextField label="Account name" variant="outlined" {...register("name")} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="transaction-account-modal-balance">Balance</InputLabel>
                <OutlinedInput
                  id="transaction-account-modal-balance"
                  startAdornment={<InputAdornment position="start">đ</InputAdornment>}
                  label="Balance"
                  {...register("balance")}
                />
              </FormControl>
            </Grid>

            <Grid display="flex" flexDirection="row" justifyContent="end" alignItems="center" gap={1}>
              <Button variant="contained" type="submit">Create</Button>
              <Button variant="outlined" onClick={() => props.close()}>
                Cancel
              </Button>
            </Grid>
          </form>
        </Box>
      </>
    </Modal>
  );
};

export default TransactionsAccountModal;
