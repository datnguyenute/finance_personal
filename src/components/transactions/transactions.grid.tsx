import { Box } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationMeta, GridPaginationModel } from '@mui/x-data-grid';

const columns: GridColDef<ITransaction>[] = [
  { field: '_id', headerName: 'ID', width: 100 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'category', headerName: 'Category', width: 150 },
  {
    field: 'amount', headerName: 'Amount', width: 150, valueGetter: (_, row) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(row.amount),
  },
  { field: 'date', headerName: 'Date', width: 180 },
  { field: 'description', headerName: 'Description', width: 180, editable: true },
  { field: 'updatedAt', headerName: 'Last update', width: 180 },
];

interface ITransactionsGridProps {
  data: ITransaction[],
  paginationMeta: GridPaginationModel,
  totalCount: number,
  updatePagination: (current: number, pageSize: number) => void
}
const TransactionsGrid = (props: ITransactionsGridProps) => {
  const { data, updatePagination, paginationMeta, totalCount } = props;

  console.log({ data, updatePagination, paginationMeta, totalCount });

  const onPaginationMetaChange = (paginationMeta: GridPaginationMeta) => {
    console.log(paginationMeta);
  }

  const onPaginationModelChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
    console.log({ model, details });
    updatePagination(model.page + 1, model.pageSize);
  }
  return (
    <Box sx={{ height: 400, width: '100%', pt: 1 }}>
      <DataGrid
        rows={data}
        columns={columns}
        rowCount={totalCount}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: paginationMeta.pageSize,
              page: paginationMeta.page,
            },
          },
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 15]}
        paginationMode="server"
        disableRowSelectionOnClick
        onPaginationMetaChange={onPaginationMetaChange}
        onPaginationModelChange={onPaginationModelChange}
      />
    </Box>
  )
}

export default TransactionsGrid;