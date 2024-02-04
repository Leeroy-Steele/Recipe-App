import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const client = await clientPromise;
const db = client.db("RecipeAppData");

// To check email is unique, then check pw is valid, then create the user
export async function POST(request) {
  const requestBody = await request.json();
  const { email, password, userName } = requestBody;
  const dbRequestForEmail = await db.collection("Users").findOne({ email: email });
  const dbRequestForUserName = await db.collection("Users").findOne({ userName: userName });

  //check email is unique first
  if (dbRequestForEmail != null) {
    return NextResponse.json({
      isEmailValid: false,
      isUserNameValid: null,
      isPWValid: null,
      isSaved: false,
      UserName: null,
    });
  }

  //check password is valid
  else if (typeof password !== "string" || password.length < 3) {
    return NextResponse.json({
      isEmailValid: true,
      isUserNameValid: null,
      isPWValid: false,
      isSaved: false,
      UserName: null,
    });
  }

  //check userName is valid
  else if (dbRequestForUserName != null || typeof userName != "string") {
    return NextResponse.json({
      isEmailValid: true,
      isUserNameValid: false,
      isPWValid: null,
      isSaved: false,
      UserName: null,
    });
  }

  // Create new user in DB
  else {
    const dbRequestNewUser = await db.collection("Users").insertOne(requestBody);
    return NextResponse.json({
      isEmailValid: true,
      isUserNameValid: true,
      isPWValid: true,
      isSaved: true,
      UserName: dbRequestNewUser.ops[0].userName,
    });
  }
}
