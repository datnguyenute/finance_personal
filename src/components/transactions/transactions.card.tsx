import { Box, Card, CardActions, CardContent, Typography, Button } from "@mui/material";

const TransactionCard = () => {
  return (
    <Card sx={{ mb: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Total assets
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Infomation of your account</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default TransactionCard