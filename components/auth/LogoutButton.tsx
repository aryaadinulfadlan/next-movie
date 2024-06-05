"use client";

import { logout } from "@/actions/auth";
import { ExitIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function LogoutButton() {
  const handleLogout = () => {
    logout()
      .then(() => toast.success("Successfully Logout!"))
      .catch(() => toast.error("Something Went Wrong!"));
  };
  return (
    <div
      className="flex items-center font-medium cursor-pointer text-sm xl:text-base text-red-300 w-full"
      onClick={handleLogout}
    >
      <ExitIcon className="w-4 h-4 xl:w-5 xl:h-5 mr-2" />
      Logout
    </div>
  );
}
