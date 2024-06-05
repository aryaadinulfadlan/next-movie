import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Poppins } from "next/font/google";
import { FaLock } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface Props {
  children: Readonly<ReactNode>;
  headerLabel: string;
  footerLabel: string;
  href: string;
}

export default function CardWrapper({
  children,
  headerLabel,
  footerLabel,
  href,
}: Props) {
  return (
    <Card className="bg-[#393737] text-white w-full max-w-[320px] sm:max-w-[400px] xl:max-w-[450px] mx-auto">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-2 xl:gap-y-4 items-center justify-center">
          <h1
            className={cn(
              "text-xl 2xl:text-3xl font-semibold flex items-center gap-2 2xl:gap-4",
              font.className
            )}
          >
            <FaLock /> Auth
          </h1>
          <p className="text-[#d9d5d5] font-semibold text-sm lg:text-base 2xl:text-lg">
            {headerLabel}
          </p>
        </div>
      </CardHeader>
      <CardContent className="">{children}</CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="font-normal w-full text-white text-sm lg:text-base 2xl:text-lg"
          size="sm"
          asChild
        >
          <Link href={href}>{footerLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
