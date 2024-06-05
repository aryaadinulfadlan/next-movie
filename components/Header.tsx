import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getCurrentUser } from "@/lib/utils";
import LogoutButton from "./auth/LogoutButton";
import ItemDropdown from "./auth/ItemDropdown";

export default async function Header() {
  const session = await getCurrentUser();
  return (
    <div className="sticky top-0 h-[2.5rem] xl:h-[3.5rem] flex items-center z-[10] bg-[#393737]">
      <div className="flex items-center justify-between mx-auto max-w-[1600px] w-full px-6">
        <Link href={"/"}>
          <p className="font-bold">MovieLand</p>
        </Link>
        <div className="flex items-center gap-2 xl:gap-4">
          <Link href={"/movies"}>
            <p className="text-sky-400">Movies</p>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback className="bg-sky-500">
                  <FaUser className="text-white w-3 h-3" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[13rem] xl:w-[17rem] bg-[#726e6e] grid gap-2 lg:gap-3"
              align="end"
            >
              <DropdownMenuItem className="bg-transparent focus:bg-[inital]">
                <p className="truncate font-semibold text-sm lg:text-base text-white">
                  {session ? session.name : "No User Logged In"}
                </p>
              </DropdownMenuItem>
              {!session && (
                <>
                  <ItemDropdown label="Login" href="/auth/login" />
                  <ItemDropdown label="Register" href="/auth/register" />
                </>
              )}
              {session && (
                <>
                  <ItemDropdown label="Profile" href="/profile" />
                  <ItemDropdown label="Transactions" href="/transactions" />
                  <DropdownMenuItem className="bg-[#393737] focus:bg-[inital]">
                    <LogoutButton />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
