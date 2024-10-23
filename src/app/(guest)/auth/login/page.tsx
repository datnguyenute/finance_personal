import { options } from "@/app/options";
import SignInSide from "@/components/sign-in-up/SignInSide";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(options);
  if (session && !session.error) {
    // redirect to homepage
    redirect("/")
  }

  return (
    <>
      <SignInSide />
    </>
  )
}

export default LoginPage;
