import { isAdmin } from "@/libs/isAdmin";
import mongoose from "mongoose";
import { User } from "@/models/User";

export async function GET() {
  mongoose.connect(process.env.MONGODB_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
