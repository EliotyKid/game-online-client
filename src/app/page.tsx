import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

const Page = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 space-y-8 text-center">
      <h1 className="font-extrabold text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-purple-900 drop-shadow-lg animate-bounce">
        Definitivamente um jogo online
      </h1>

      <div className="flex flex-col items-center space-y-1">
        <p className="font-light text-lg md:text-xl">produzido por</p>
        <h4 className="font-black text-2xl md:text-3xl tracking-widest drop-shadow-md">
          NLT Comunity & Mush Studio
        </h4>
      </div>

      {session ? (
        <div className="flex flex-col items-center space-y-3">
          <p className="text-lg md:text-xl animate-pulse">
            Bem-vindo, <span className="font-semibold">{session.user?.name}</span>!
          </p>
          <Link href="/game">
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform duration-300 shadow-lg text-lg px-8 py-3">
              Jogar
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <p className="text-lg md:text-xl animate-pulse">Participe dessa jornada!</p>
          <Link href="/sign-in">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform duration-300 shadow-lg text-lg px-8 py-3">
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
