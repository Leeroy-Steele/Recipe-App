"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/contextProvider";
import Card from "@/components/card";

export default function FavouriteRecipesPage() {
  // for the context
  const {userName} = useContext(MyContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRecipes(result);
      })
      .catch((error) => console.log("error", error));
  }, [userName]);

  return (
    <>
      <div className="mx-auto max-w-7xl py-6 lg:px-8">
        
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl text-center">
            My Favourite Recipes
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-500 text-center">
            View or remove your favourite recipes here. Or why not create your own?
          </p>
        
      </div>

      <hr></hr>
      <br></br>
      <div 
        style={{maxWidth:"1500px"}}
        className="mx-auto p-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {recipes &&
          recipes.map((recipe) => (
            <Card key={recipe.id} product={recipe}></Card>
          ))}
      </div>
    </>
  );
}
