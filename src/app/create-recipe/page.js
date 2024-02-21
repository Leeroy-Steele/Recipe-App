"use client";
import { useContext, useEffect, useState } from "react";
import PillButtons from "@/components/pillButtons";

import { MyContext } from "@/context/contextProvider";

export default function Page({ params }) {
  // for the context
  const { userName } = useContext(MyContext);

  //for the form
  
  const [recipeID, setRecipeID] = useState(Math.random())
  const [recipeTitle, setRecipeTitle] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [recipeSummary, setRecipeSummary] = useState("")
  const [readyInMinutes, setReadyInMinutes] = useState(0)
  const [servings, setServings] = useState(0)
  const [instructions, setInstructions] = useState([])
  const [recipeIsVegetarian, setRecipeIsVegetarian] = useState(false)
  const [recipeIsVegan, setRecipeIsVegan] = useState(false)
  const [recipeIsGlutenFree, setRecipeIsGlutenFree] = useState(false)
  const [recipeIsDairyFree, setRecipeIsDairyFree] = useState(false)
  const [recipePricePerServing, setRecipePricePerServing] = useState(0)
  const [ingredients, setIngredients] = useState([])




  

  // useEffect(() => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("x-api-key", "1cdfdd18388841c5b48f2d282e84dc00");
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   //get recipe from spoonacular api
  //   fetch(
  //     `https://api.spoonacular.com/recipes/${params.productID}/information`,
  //     requestOptions
  //   )
  //     .then((response1) => response1.json())
  //     .then((fetchedRecipe) => {
  //       fetchedRecipe.isFavourite = false;
  //       // get all user favourite recipes
  //       const requestOptions2 = {
  //         method: "GET",
  //         redirect: "follow",
  //       };
  //       fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions2)
  //         .then((response2) => response2.json())
  //         .then((favouriteRecipes) => {
  //           //identify if there is a id match between fetched recipe and favouriteRecipes
  //           favouriteRecipes.forEach((favouriteRecipe) => {
  //             if (favouriteRecipe.id === fetchedRecipe.id) {
  //               //if yes, add isFavourite = true
  //               fetchedRecipe.isFavourite = true;
  //               fetchedRecipe._id = favouriteRecipe._id;
  //             }
  //           })

  //           //assign to displayData
  //           setDisplayData(fetchedRecipe)
  //         })
  //     })
  //     .catch((error) => console.log("error", error))
  // }, [])

  return (
    <div className="relative isolate overflow-hidden px-24 py-12">
      new page yo
    </div>
  );
}
