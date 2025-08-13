import { auth } from "@/lib/auth";
import Game from "./Game";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // pega os cookies
  const cookieStore = await cookies(); // await necessário
  const token = cookieStore.get("authjs.session-token")?.value;

  return <Game token={token} />;
}
