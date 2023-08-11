import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const client = await clientPromise;
const db = client.db("RecipeApp");

export async function GET() {
  
  const dbRequest = await db.collection("favourite_recipes").find({}).toArray();
  return NextResponse.json({ status: 200, data: dbRequest });
}

export async function POST(request) {
  // request.json() will get the body 
  const bodyObject = await request.json();
  const dbRequest = await db.collection("favourite_recipes").insertOne(bodyObject);
  return NextResponse.json(dbRequest.ops[0]);
}

export async function DELETE(request) {
  // request.json() will get the body 
  const {name} = await request.json();
  const dbRequest = await db.collection("favourite_recipes").deleteOne({"name":name});
  return NextResponse.json(dbRequest.result);
}

export async function PATCH(request) {
  // request.json() will get the body 
  const {name, difficulty} = await request.json();
  const dbRequest = await db.collection("favourite_recipes").updateOne({"name":name},{$set:{"difficulty":difficulty}});
  return NextResponse.json(dbRequest.result);
}


