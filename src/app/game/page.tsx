import { auth } from "@/lib/auth";
import Game from "./Game";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  
  // const cookieStore = await cookies(); // await necessário
  // const token = cookieStore.get("authjs.session-token")?.value;

  return <Game />;
}
