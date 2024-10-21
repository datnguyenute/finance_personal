import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUp from "@/components/sign-in-side/SignUp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {

  const session = await getServerSession(authOptions);
  if (session && !session.error) {
    // redirect to homepage
    redirect("/")
  }
  return (
    <>
      <SignUp />
    </>
  )
}

export default RegisterPage;