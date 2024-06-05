import ProtectedNavbar from "@/components/ProtectedNavbar";
import { ReactNode } from "react";

interface Props {
  children: Readonly<ReactNode>;
}
export default async function ProtectedLayout({ children }: Props) {
  return (
    <div className="min-h-[calc(100vh-2.5rem)] xl:min-h-[calc(100vh-3.5rem) pt-10 pb-[4rem] lg:pb-[6rem] px-6 grid gap-10 content-start">
      <ProtectedNavbar />
      <div className="max-w-[600px] lg:max-w-[700px] w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
