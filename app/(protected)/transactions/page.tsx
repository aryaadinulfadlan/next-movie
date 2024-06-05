import { getTransactionByUser } from "@/actions/transaction";
import { get500Image } from "@/config";
import { dateFormatter, getCurrentUser } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Transactions() {
  const user = await getCurrentUser();
  const { error, success: data } = await getTransactionByUser(user!.id);
  if (error) {
    toast.error("Something Went Wrong!");
    redirect("/profile");
  }
  return (
    <div className="border border-white/40 bg-[#393737] rounded-lg grid grid-rows-[auto_1fr] content-start gap-10 lg:gap-14 p-3 sm:px-8 sm:py-6">
      <div className="flex items-center justify-between">
        <p className="font-medium lg:text-xl">My Transactions</p>
        <p className="font-medium lg:text-xl">{data?.length} Data</p>
      </div>
      {!data?.length ? (
        <div className="text-center my-4 lg:my-6 text-lg lg:text-2xl">
          No Transactions Data
        </div>
      ) : (
        <div className="h-[80vh] overflow-auto rounded-md grid gap-4 md:gap-6 xl:gap-8 content-start">
          {data.map((el) => (
            <div
              className="grid grid-cols-[4rem_1fr] lg:grid-cols-[6rem_1fr] gap-3 lg:gap-5 rounded-lg border border-white/30 p-0 shadow-sm"
              key={el.id}
            >
              <div
                className="bg-no-repeat bg-cover bg-center rounded-lg h-[100px] lg:h-[150px]"
                style={{
                  backgroundImage: `url(${get500Image(el.movie_poster_path)})`,
                }}
              />
              <div className="text-sm grid gap-1.5 content-start">
                <p className="font-medium">{el.movie_title}</p>
                <span className="text-xs lg:text-sm italic">
                  {dateFormatter(el.movie_release_date)}
                </span>
                <div className="flex items-center gap-1 lg:gap-2">
                  <StarFilledIcon className="text-yellow-300 w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <p className="text-xs font-bold lg:text-sm">
                    {Math.round(Number(el.movie_rating) * 10) / 10}
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1 lg:w-2 lg:h-2" />
                  <span className="font-medium underline text-xs lg:text-sm">
                    {el.movie_review} reviews
                  </span>
                </div>
                <span className="font-medium text-xs lg:text-sm">
                  {el.movie_overview}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
