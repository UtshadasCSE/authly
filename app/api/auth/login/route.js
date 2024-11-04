import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/config/db";
import userModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectMongoDB();

  const user = userModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return NextResponse.json(
      { message: "Invalid creadential!" },
      { status: 400 }
    );
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return NextResponse.json(
    { message: "Logged in successfully", token },
    { status: 200 }
  );
}
