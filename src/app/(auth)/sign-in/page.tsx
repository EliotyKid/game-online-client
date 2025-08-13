import { DiscordSignIn } from "@/components/discord-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-8 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg animate-bounce">
          Sign In
        </h1>

        <div className="flex flex-col space-y-4">
          <DiscordSignIn />
        </div>
      </div>
    </div>
  );
};

export default Page;
