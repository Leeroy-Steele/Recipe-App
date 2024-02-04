import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const client = await clientPromise;
const db = client.db("RecipeAppData");

// To check email and password when logging a user in
export async function POST(request) {
  const { email, password } = await request.json();

  //check user email exists in DB first
  const dbRequest = await db.collection("Users").findOne({ email: email });
  if (dbRequest == null) {
    return NextResponse.json({
      isEmailValid: false,
      isPWValid: null,
      userName: null,
    });
  }

  //check the password is correct
  else if (dbRequest.password !== password) {
    return NextResponse.json({
      isEmailValid: true,
      isPWValid: false,
      userName: null,
    });
  }

  // if email & pw match
  return NextResponse.json({
    isEmailValid: true,
    isPWValid: true,
    userName: dbRequest.userName,
  });
}
