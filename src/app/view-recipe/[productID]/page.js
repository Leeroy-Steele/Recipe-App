"use client";
import { useContext, useEffect, useState } from "react";
import PillButtons from "@/components/pillButtons";

import { MyContext } from "@/context/contextProvider";

export default function Page({ params }) {
  // for the context
  const { userName } = useContext(MyContext);

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "1cdfdd18388841c5b48f2d282e84dc00");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //get recipe from spoonacular api
    fetch(
      `https://api.spoonacular.com/recipes/${params.productID}/information`,
      requestOptions
    )
      .then((response1) => response1.json())
      .then((fetchedRecipe) => {
        fetchedRecipe.isFavourite = false;
        // get all user favourite recipes
        const requestOptions2 = {
          method: "GET",
          redirect: "follow",
        };
        fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions2)
          .then((response2) => response2.json())
          .then((favouriteRecipes) => {
            //identify if there is a id match between fetched recipe and favouriteRecipes
            favouriteRecipes.forEach((favouriteRecipe) => {
              if (favouriteRecipe.id === fetchedRecipe.id) {
                //if yes, add isFavourite = true
                fetchedRecipe.isFavourite = true;
                fetchedRecipe._id = favouriteRecipe._id;
              }
            })

            //assign to displayData
            setDisplayData(fetchedRecipe)
          })
      })
      .catch((error) => console.log("error", error))
  }, [])

  return (
    <div className="relative isolate overflow-hidden px-24 py-12">
      {typeof displayData == "object" && displayData.length != 0 && (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-semibold pb-3 text-gray-900 text-center">
              {displayData.title}
            </h3>

            <div className="flex flex-col items-center justify-center">
              {displayData.isFavourite ? (
                <PillButtons name="Delete" recipe={displayData}></PillButtons>
              ) : (
                <PillButtons name="Save" recipe={displayData}></PillButtons>
              )}
            </div>

            <h4 className="max-w-fit px-4 py-1 rounded bg-green-200 text-center width-500px m-auto">
              {displayData.vegan
                ? "Vegan"
                : displayData.vegetarian
                ? "Vegetarian"
                : ""}
            </h4>
            <dd
              className="my-5 leading-6"
              dangerouslySetInnerHTML={{ __html: displayData.summary }}
            >
              {/* data comes from dangerouslySetInnerHTML above*/}
            </dd>

            <img
              style={{ margin: "auto", borderRadius: "50px" }}
              src={displayData.image}
              width={"800"}
            />
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 md:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ingredients
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"></dd>
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

              <div className="px-4 py-6 md:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Servings: {displayData.servings}
                </dt>

                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ready in: {displayData.readyInMinutes} (Minutes)
                </dt>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Cooking instructions
                </dt>
                <dd
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  dangerouslySetInnerHTML={{ __html: displayData.instructions }}
                ></dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
