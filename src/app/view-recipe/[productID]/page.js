"use client";
import { useContext, useEffect, useState } from "react";
import PillButtons from "@/components/pillButtons";

import { MyContext } from "@/context/contextProvider";

export default function Page({ params }) {
  const { userName } = useContext(MyContext);
  const [displayData, setDisplayData] = useState([]);
  // const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    // get all user favourite recipes
    const favRecipesReqOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`/api/favourite-recipes?userName=${userName}`, favRecipesReqOptions)
      .then((favRecipeResp) => favRecipeResp.json())
      .then((favouriteRecipes) => {
        // find out if recipe is in favourites
        let isFavourite = false;
        favouriteRecipes.forEach((recipe) => {
          if (!isFavourite && params.productID == recipe.id) {
            setDisplayData(recipe);
            isFavourite = true;
          }
        });

        //If not, get recipe from spoonacular api
        if (!isFavourite) {
          const myHeaders = new Headers();
          myHeaders.append("x-api-key", "1cdfdd18388841c5b48f2d282e84dc00");
          const spoonacularReqOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          fetch(
            `https://api.spoonacular.com/recipes/${params.productID}/information`,
            spoonacularReqOptions
          )
            .then((spoonacularResp) => spoonacularResp.json())
            .then((spoonacularRecipe) => {
              spoonacularRecipe.isFavourite = false;
              setDisplayData(spoonacularRecipe);
            })
            .catch((error) => console.log("error", error));
        }
      });
  }, []);

  return (
    <div style={{ maxWidth: "1500px" }} className="relative isolate overflow-hidden px-8 py-2 m-auto">
      {typeof displayData == "object" && displayData.length != 0 && (
        <div>
          <br></br>
          <div className="grid grid-flow-col auto-cols-max  justify-center gap-5 p-4">
            {/* Title */}
            <h2 className="text-2xl font-semibold mt-1 text-gray-900">
              {displayData.title}
            </h2>

            {/* Delete / Save button */}

            {displayData.isFavourite ? (
              <PillButtons name="Delete" recipe={displayData}></PillButtons>
            ) : (
              <PillButtons name="Save" recipe={displayData}></PillButtons>
            )}
          </div>

          <hr></hr>
          <br></br>

          {/* Dietary badges */}
          <div className="grid grid-flow-col auto-cols-max justify-center gap-2">
            {displayData.vegetarian && (
              <h4 className=" p-3 rounded bg-green-200 text-center">
                Vegetarian
              </h4>
            )}
            {displayData.vegan && (
              <h4 className=" p-3 rounded bg-green-200 text-center">Vegan</h4>
            )}
            {displayData.glutenFree && (
              <h4 className=" p-3 rounded bg-green-200 text-center">
                Gluten Free
              </h4>
            )}
            {displayData.dairyFree && (
              <h4 className=" p-3 rounded bg-green-200 text-center">
                Dairy Free
              </h4>
            )}
          </div>

          {/* Cooking instructions */}
          <div className=" py-6 m-auto" >
            {displayData.analyzedInstructions ? (
              displayData.analyzedInstructions[0].steps.map((instruction) => {
                return (
                  <dd key={instruction.number} className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0 mb-6">
                    <b>{`Step ${instruction.number}`}</b><br></br>{instruction.step}
                  </dd>
                );
              })
            ) : (
              <dd
                className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0 mb-6"
                dangerouslySetInnerHTML={{ __html: displayData.instructions }}
              ></dd>
            )}
          </div>

          {/* recipe image */}
          <img
            style={{ margin: "auto", borderRadius: "50px" }}
            src={displayData.image}
            width={"800"}
          />

          {/* ingredients */}
          <div className="py-6 md:grid sm:grid-cols-4 md:grid-cols-6 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Ingredients
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0"></dd>

            {displayData.extendedIngredients.map((ingredient) => (
              <div
                key={Math.random()}
                className="px-1 py-1 sm:gap-4 sm:px-0 bg-gray-100"
              >
                <p className="mt-1 rounded-lg text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-1 text-center">
                  {ingredient.name}
                </p>
              </div>
            ))}
          </div>

          {/* Recipe Summary */}
          <dd
            className="my-5 leading-6 text-start"
            dangerouslySetInnerHTML={{ __html: displayData.summary }}
          >
            {/* data comes from dangerouslySetInnerHTML above*/}
          </dd>

          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Servings / Ready in / Price per serving */}
              <div className="px-4 py-6 md:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Servings: {displayData.servings}
                </dt>

                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ready in: {displayData.readyInMinutes} (Minutes)
                </dt>

                <dt className="text-sm font-medium leading-6 text-gray-900">
                  PricePerServing: ${displayData.pricePerServing}
                </dt>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
