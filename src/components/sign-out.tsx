"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface SignOutProps {
  className?: string; // permite passar classes personalizadas
  buttonClassName?: string; // opcional: classes específicas para o botão
}

const SignOut: React.FC<SignOutProps> = ({ className = "", buttonClassName = "" }) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Button
        variant="destructive"
        onClick={handleSignOut}
        className={buttonClassName}
      >
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };

