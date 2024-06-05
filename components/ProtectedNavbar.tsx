"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import UserButton from "./auth/UserButton";
import { cn } from "@/lib/utils";

export default function ProtectedNavbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-[#575555] flex justify-between items-center p-2 lg:px-4 lg:py-3 rounded-xl max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] w-full shadow-sm mx-auto">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/profile" ? "default" : "outline"}
          size={"sm"}
          className={cn(
            "border border-white/40",
            pathname === "/profile" ? "bg-[#393737]" : ""
          )}
        >
          <Link href={"/profile"}>Profile</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/transactions" ? "default" : "outline"}
          size={"sm"}
          className={cn(
            "border border-white/40",
            pathname === "/transactions" ? "bg-[#393737]" : ""
          )}
        >
          <Link href={"/transactions"}>Transactions</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}
