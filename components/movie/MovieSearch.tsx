"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export default function MovieSearch() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 1000);
  return (
    <div className="w-[80%] max-w-[550px] mx-auto">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        className="px-4 rounded-2xl lg:px-6 lg:py-6 lg:text-base"
        placeholder="Type here.."
        defaultValue={searchParams.get("query") ?? ""}
      />
    </div>
  );
}
