import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 px-4 py-8 space-y-8">
      {/* Card do personagem */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center space-y-4 w-full max-w-sm animate-fadeIn">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
          <img
            src={session.user?.image || "/default-avatar.png"}
            // alt={session.user?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nome do personagem */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg animate-pulse">
          {session.user?.name}
        </h1>

        {/* Informações */}
        <p className="text-gray-500 text-center">Aventureiro em busca de desafios</p>

        {/* Botões de ação */}
        <div className="flex flex-col w-full space-y-3 mt-4">
          <Link href="/game">
            <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform duration-300 shadow-lg text-lg py-3">
              Jogar
            </Button>
          </Link>
          <SignOut buttonClassName="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-lg text-lg py-3" />
        </div>
      </div>
    </div>
  );
};

export default Page;
