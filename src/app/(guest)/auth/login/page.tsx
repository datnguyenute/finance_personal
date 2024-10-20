import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInSide from "@/components/sign-in-side/SignInSide";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
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
