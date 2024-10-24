import { options } from "@/app/options";
import Report from "@/components/report/report";
import { useSnackbar } from "@/utils/snackbar.wrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ReportPage = async () => {
  const session = await getServerSession(options);
  // const { showSnackbar } = useSnackbar();
  if (!session || session.error) {
    // showSnackbar("No authorize this page! Please login!");
    // redirect to homepage
    redirect("/");
  }
  return (
    <>
      <Report />
    </>
  );
};

export default ReportPage;
