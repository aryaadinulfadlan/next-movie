"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface Props {
  label: string;
  href: string;
}
export default function ItemDropdown({ label, href }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <DropdownMenuItem className="bg-[#393737] focus:bg-[inital]">
      <div
        onClick={handleClick}
        className="flex items-center font-medium cursor-pointer text-sm xl:text-base text-white w-full"
      >
        {label}
      </div>
    </DropdownMenuItem>
  );
}
