import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex items-start justify-center h-[calc(100vh-2.5rem)] xl:h-[calc(100vh-3.5rem)]">
      <div className="h-[70%] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] xl:w-[6rem] xl:h-[6rem] animate-spin" />
      </div>
    </div>
  );
}
