import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
const client = await clientPromise;
const db = client.db("RecipeAppData");
import { ObjectId } from "bson";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get("userName");

  const dbRequest = await db
    .collection("FavouriteRecipes")
    .find({ userName: userName })
    .toArray();
  return NextResponse.json(dbRequest);
}

export async function POST(request) {
  // request.json() will get the body
  const bodyObject = await request.json();
  const dbRequest = await db
    .collection("FavouriteRecipes")
    .insertOne(bodyObject);

  return NextResponse.json({
    isSaved:true,
    _id:dbRequest.ops[0]._id
  });

}

export async function DELETE(request) {
  const { _id } = await request.json();

  const dbRequest = await db
    .collection("FavouriteRecipes")
    .deleteOne({ _id: new ObjectId(_id) });

  if (dbRequest.result.n !== 1) {
    // Problem
    return NextResponse.json({
      isSuccessful: false,
      recipe_ID: _id,
    });
  } else {
    // Successfull
    return NextResponse.json({
      isSuccessful: true,
      recipe_ID: _id,
    });
  }
}

