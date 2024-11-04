import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/config/db";
import userModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, email, password } = await req.json();
  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User already exist!" },
      { status: 400 }
    );
  }
}
