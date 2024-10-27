import { options } from "@/app/options";
import Report from "@/components/report/report";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

const ReportPage = async () => {
  const session = await getServerSession(options);
  let accounts: IAccount[] = [];
  if (session?.access_token) {
    const data = await sendRequest<IBackendRes<IAccount[]>>({
      url: `${process.env.BACKEND_URL}/accounts/by-user`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    accounts = (data && data.data) || [];
  }

  return (
    <>
      <Report accounts={accounts} />
    </>
  );
};

export default ReportPage;
