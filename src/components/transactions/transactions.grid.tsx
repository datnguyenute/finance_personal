"use client"
import { Box, Chip, ChipPropsColorOverrides } from "@mui/material"
import { OverridableStringUnion } from '@mui/types';
;
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, GridPaginationMeta, GridPaginationModel, GridRenderCellParams } from '@mui/x-data-grid';

type ColorType = OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
>;
const getRandomColor = (input: string | undefined): ColorType => {
  const predefinedColors: Record<string, ColorType> = {
    'Online Subscription': 'primary',
    'Groceries': 'secondary',
    'Salary': 'info',
    'Refund': 'default',
    'Income': 'success',
    'Expense': 'warning',
  };

  // Return predefined color if exists, otherwise random
  if (input && predefinedColors[input]) {
    return predefinedColors[input];
  }
  const colors: ColorType[] = [
    'default',
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const columns: GridColDef<ITransaction>[] = [
  { field: '_id', headerName: 'ID', width: 100 },
  {
    field: 'type', headerName: 'Type', width: 100, renderCell: (params: GridRenderCellParams<any, string>) => (
      <Chip label={params.value?.toString()} color={getRandomColor(params.value)} variant="filled" />
    ),
  },
  {
    field: 'category', headerName: 'Category', width: 150, renderCell: (params: GridRenderCellParams<any, string>) => (
      <Chip label={params.value?.toString()} color={getRandomColor(params.value)} variant="outlined" />
    ),
  },
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