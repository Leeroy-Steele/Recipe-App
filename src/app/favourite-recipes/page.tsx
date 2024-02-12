"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/contextProvider";
import Card from "@/components/card";

export default function FavouriteRecipesPage() {
  // for the context
  const {
    userName,
    updateUserName,
    userEmail,
    updateEmail,
    loggedIn,
    updateLoggedIn,
  } = useContext(MyContext);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log(`/api/favourite-recipes?userName=${userName}`);
    fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRecipes(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <h4>My Favourite Recipes Page</h4>
      <hr></hr>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {recipes &&
          recipes.map((recipe) => (
            <Card key={recipe.id} product={recipe} ></Card>
          ))}
      </div>
    </>
  );
}
