export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IAccount {
    name: string;
    balance: number;
    _id: string;
  }

  interface ITransaction {
    _id: string;
    type: string;
    category: string;
    date: Date;
    amount: number;
    updatedAt: string;
    description: string;
  }

  interface IAmountValue {
    totalAmount: number;
    totalTransaction: number;
    [key: string]: number;
  }

  // Total amount (income and expense) between from and to
  interface IBalanceFlow {
    income: IAmountValue;
    expense: IAmountValue;
  }

  interface IStatistics {
    type: string; // "day", "month", "year"
    data: {
      label: string; // day: "MM-yy", month: Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec, year: "YYYY"
      income: IAmountValue;
      expense: IAmountValue;
    }[];
  }

  interface IResponseReport {
    balanceFlow: IBalanceFlow;
    statistics: IStatistics;
  }

  interface ITransactionReport {
    balanceFlow: IBalanceFlow;
    statistics: IStatistics;
    transactionHistory: ITransaction[];
  }
}
