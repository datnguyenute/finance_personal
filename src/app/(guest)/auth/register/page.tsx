import { options } from "@/app/options";
import SignUp from "@/components/sign-in-up/SignUp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {

  const session = await getServerSession(options);
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