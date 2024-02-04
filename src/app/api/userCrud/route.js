import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const client = await clientPromise;
const db = client.db("RecipeAppData");

export async function GET() {
  
  const dbRequest = await db.collection("Users").find({}).toArray();
  return NextResponse.json({ status: 200, data: dbRequest });
}

export async function POST(request) {
  // request.json() will get the body 
  const bodyObject = await request.json();
  const dbRequest = await db.collection("Users").insertOne(bodyObject);
  return NextResponse.json(dbRequest.ops[0]);
}

export async function DELETE(request) {
  // request.json() will get the body 
  const {userID} = await request.json();
  const dbRequest = await db.collection("Users").deleteOne({"userID":userID});
  return NextResponse.json(dbRequest.result);
}

export async function PATCH(request) {
  // request.json() will get the body 
  const {userID, password} = await request.json();
  const dbRequest = await db.collection("Users").updateOne({"userID":userID},{$set:{"password":password}});
  return NextResponse.json(dbRequest.result);
}


