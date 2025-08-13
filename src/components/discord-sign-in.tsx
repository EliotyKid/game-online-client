import { Button } from "@/components/ui/button";
import { Discord } from "@/components/ui/discord";
import { signIn } from "@/lib/auth";

const DiscordSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord")
      }}
    >
      <Button className="w-full" variant="outline">
        <Discord />
        Continue com o Discord
      </Button>
    </form>
  );
};

export { DiscordSignIn };
