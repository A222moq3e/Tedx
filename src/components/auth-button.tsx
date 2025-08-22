"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import Image from "next/image";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (!session) {
    return (
      <Button 
        variant="default" 
        size="sm" 
        onClick={() => signIn("google")}
        className="bg-primary hover:bg-primary/90"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User"}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{session.user?.name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
