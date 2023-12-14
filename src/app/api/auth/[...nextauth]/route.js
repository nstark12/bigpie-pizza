import { UserInfo } from "@/models/UserInfo";
import NextAuth, { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
