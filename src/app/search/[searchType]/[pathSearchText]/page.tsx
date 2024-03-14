"use client";

import { useState } from "react";
import HeaderSection from "@/components/headerSection";
import Card from "@/components/card";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import backgroundImage from "@/../../public/images/1.jpg";

// fetcher for swr
const fetcher = (url: string, apiKey: string) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "x-api-key": apiKey,
    },
  };
  let resp = axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return resp;
};

export default function SearchByIngredients({
  params,
}: {
  params: { pathSearchText: string; searchType: string };
}) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(params.pathSearchText);
  const [searchType, setSearchType] = useState(params.searchType);

  // get recipes from spoonacular
  const { data, error, isLoading } = useSWR(
    searchType === "recipe"
      ? `https://api.spoonacular.com/recipes/complexSearch?titleMatch=${searchText}`
      : `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchText}&number=20`,
    (url: string) => fetcher(url, "1cdfdd18388841c5b48f2d282e84dc00")
  );

  // isLoading?null:console.log(data.results);

  const handleIngredientsChange = (e: any) => {
    e.preventDefault();
    const ingredients = e.target.ingredientsInput.value.replaceAll(", ", ",+");
    router.push(`/search/ingredients/${ingredients}`);
  };

  const handleRecipeChange = (e: any) => {
    e.preventDefault();
    const recipe = e.target.ingredientsInput.value.replaceAll(", ", ",+");
    router.push(`/search/recipe/${recipe}`);
  };

  const handleSearchTypeChange = (type: string) => {
    router.push(`/search/${type}/a`);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          width: "100%",
          // height: '200px',
        }}
        className="relative isolate overflow-hidden py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-center">
            {searchType === "recipe"
              ? `Search for recipes`
              : `Search for recipes by ingredients`}
          </h2>

          {/* Search Type Button */}
          <div className="mt-6 flex justify-center">
          <button
            onClick={() => handleSearchTypeChange("recipe")}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Search by Recipe
          </button>
          <button
            onClick={() => handleSearchTypeChange("ingredients")}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Search by Ingredients
          </button>
          </div>

        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8 lg:max-w-7xl lg:px-8">
          {/* Search Text Input */}
          {searchType === "recipe" ? (
            <form
              onSubmit={handleRecipeChange}
              className="mx-auto max-w-xl pt-2 pb-8"
            >
              <h5 className="mb-3 text-md text-center font-medium text-gray-500 dark:text-white">
                Enter Recipe Name
              </h5>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="ingredientsInput"
                  id="ingredientsInput"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Eggs Benne"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Recipes
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleIngredientsChange}
              className="mx-auto max-w-xl pt-2 pb-8"
            >
              <h5 className="mb-3 text-md text-center font-medium text-gray-500 dark:text-white">
                Enter ingredients seperated by a comma
              </h5>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="ingredientsInput"
                  id="ingredientsInput"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Eggs, milk, butter"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Recipes
                </button>
              </div>
            </form>
          )}

          {/* Recipe Cards go here */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {!isLoading &&
              !error &&
              searchType === "recipe" &&
              data.results.map((product: any) => (
                <Card key={product.id} product={product}></Card>
              ))}

            {!isLoading &&
              !error &&
              searchType === "ingredients" &&
              data.map((product: any) => (
                <Card key={product.id} product={product}></Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
