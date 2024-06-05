import UserInfo from "@/components/auth/UserInfo";
import { currencyFormatter, getCurrentUser } from "@/lib/utils";

export default async function Profile() {
  const user = await getCurrentUser();
  return (
    <div className="border border-white/40 bg-[#393737] rounded-xl grid gap-8 lg:gap-14 p-3 sm:px-8 sm:py-6">
      <div className="flex items-center justify-between">
        <p className="font-medium lg:text-xl">My Profile</p>
        <p className="font-medium lg:text-xl">
          {currencyFormatter.format(user!.saldo)}
        </p>
      </div>
      <div className="grid gap-2 sm:gap-4 lg:gap-6">
        <UserInfo label="ID" value={user!.id} />
        <UserInfo label="Name" value={user?.name as string} />
        <UserInfo label="Email" value={user?.email as string} />
        <UserInfo label="Username" value={user!.username} />
        <UserInfo label="Saldo" value={currencyFormatter.format(user!.saldo)} />
      </div>
    </div>
  );
}
