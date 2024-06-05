import { useSession } from "next-auth/react";

export default function () {
  const session = useSession();
  return session.data?.user;
}
