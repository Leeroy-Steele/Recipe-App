"use client";
import { useContext, useEffect, useState } from "react";
import PillButtons from "@/components/pillButtons";
import { MyContext } from "@/context/contextProvider";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  // for the context
  const { userName } = useContext(MyContext);

  //for the form

  const [recipeID, setRecipeID] = useState(Math.random());
  const [recipeTitle, setRecipeTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [recipeSummary, setRecipeSummary] = useState("");
  const [readyInMinutes, setReadyInMinutes] = useState(0);
  const [servings, setServings] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [recipeIsVegetarian, setRecipeIsVegetarian] = useState(false);
  const [recipeIsVegan, setRecipeIsVegan] = useState(false);
  const [recipeIsGlutenFree, setRecipeIsGlutenFree] = useState(false);
  const [recipeIsDairyFree, setRecipeIsDairyFree] = useState(false);
  const [recipePricePerServing, setRecipePricePerServing] = useState(0);
  const [extendedIngredients, setIngredients] = useState('');

    // for page redirect
    const router = useRouter();

  // for when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const ingredientsArray = extendedIngredients.split(',')
    let modifiedIngredientsArray = ingredientsArray.map((ingredient)=>{
      console.log("is this happening")
      return {name:ingredient}
    })
    console.log(modifiedIngredientsArray)

    //console.log the form
    console.log({
      recipeID: recipeID,
      recipeTitle: recipeTitle,
      imageURL: imageURL,
      recipeSummary: recipeSummary,
      readyInMinutes: readyInMinutes,
      servings: servings,
      instructions: instructions,
      recipeIsVegetarian: recipeIsVegetarian,
      recipeIsVegan: recipeIsVegan,
      recipeIsGlutenFree: recipeIsGlutenFree,
      recipeIsDairyFree: recipeIsDairyFree,
      recipePricePerServing: recipePricePerServing,
      extendedIngredients: modifiedIngredientsArray,
    });

    //create json for post request
    const raw = JSON.stringify({
      id: recipeID,
      userName: userName,
      isFavourite: true,
      title: recipeTitle,
      image: imageURL,
      summary: recipeSummary,
      readyInMinutes: readyInMinutes,
      servings: servings,
      sourceUrl: "user created",
      instructions: instructions,
      vegetarian: recipeIsVegetarian,
      vegan: recipeIsVegan,
      glutenFree: recipeIsGlutenFree,
      dairyFree: recipeIsDairyFree,
      pricePerServing: recipePricePerServing,
      extendedIngredients: modifiedIngredientsArray,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    
    //post recipe to backend
    fetch("/api/favourite-recipes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //redirect to my recipes
        router.push('/favourite-recipes')
      })
      .catch((error) => console.log("error", error));

  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Top image */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-25 w-auto"
            src="https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg"
            alt="Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your own recipe here
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* title */}
            <div>
              <label
                htmlFor="recipeTitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Recipe Title *
              </label>
              <div className="mt-2">
                <input
                  id="recipeTitle"
                  name="recipeTitle"
                  type="recipeTitle"
                  autoComplete="recipeTitle"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setRecipeTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <input
                  id="imageURL"
                  name="imageURL"
                  type="imageURL"
                  placeholder="https://imageURL.com"
                  autoComplete="imageURL"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </div>
            </div>

            {/* Recipe Description */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="recipeSummary"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipe Description *
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="recipeSummary"
                  name="recipeSummary"
                  type="recipeSummary"
                  rows="5"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setRecipeSummary(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-6">
              {/* Time to make recipe  */}
              <div>
                <label
                  htmlFor="readyInMinutes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Time to make recipe
                </label>
                <div className="mt-2">
                  <input
                    id="readyInMinutes"
                    name="readyInMinutes"
                    type="number"
                    placeholder="30"
                    autoComplete="readyInMinutes"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setReadyInMinutes(e.target.value)}
                  />
                </div>
              </div>

              {/* Number of servings */}
              <div>
                <label
                  htmlFor="servings"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of servings
                </label>
                <div className="mt-2">
                  <input
                    id="servings"
                    name="servings"
                    type="number"
                    placeholder="3"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>
              </div>

              {/* Price per serving */}
              <div>
                <label
                  htmlFor="recipePricePerServing"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price per serving ($)
                </label>
                <div className="mt-2">
                  <input
                    id="recipePricePerServing"
                    name="recipePricePerServing"
                    type="number"
                    step="any"
                    placeholder="$"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setRecipePricePerServing(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Recipe Instructions */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="instructions"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Recipe Instructions *
              </label>
            </div>
            <div className="mt-2">
              <textarea
                id="instructions"
                name="instructions"
                type="text"
                rows="15"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <ul className="grid w-full gap-6 grid-cols-2">
              {/* is vegetarian */}
              <li>
                <input
                  type="checkbox"
                  id="vegetarian"
                  value=""
                  className="hidden peer"
                  onChange={(e) => setRecipeIsVegetarian(!recipeIsVegetarian)}
                />
                <label
                  htmlFor="vegetarian"
                  className="inline-flex items-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-600 hover:text-gray-600 dark:peer-checked:text-green-300 peer-checked:text-green-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      <p className="text-right">Vegetarian</p>
                    </div>
                  </div>
                </label>
              </li>

              {/* is vegan */}
              <li>
                <input
                  type="checkbox"
                  id="vegan"
                  value=""
                  className="hidden peer"
                  onChange={(e) => setRecipeIsVegan(!recipeIsVegan)}
                />
                <label
                  htmlFor="vegan"
                  className="inline-flex items-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-600 hover:text-gray-600 dark:peer-checked:text-green-300 peer-checked:text-green-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      <p className="text-right">Vegan</p>
                    </div>
                  </div>
                </label>
              </li>

              {/* is dairy free */}
              <li>
                <input
                  type="checkbox"
                  id="dairyFree"
                  value=""
                  className="hidden peer"
                  onChange={(e) => setRecipeIsDairyFree(!recipeIsDairyFree)}
                />
                <label
                  htmlFor="dairyFree"
                  className="inline-flex items-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-600 hover:text-gray-600 dark:peer-checked:text-green-300 peer-checked:text-green-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      <p className="text-right">Dairy Free</p>
                    </div>
                  </div>
                </label>
              </li>

              {/* is gluten free */}
              <li>
                <input
                  type="checkbox"
                  id="glutenFree"
                  value=""
                  className="hidden peer"
                  onChange={(e) => setRecipeIsGlutenFree(!recipeIsGlutenFree)}
                />
                <label
                  htmlFor="glutenFree"
                  className="inline-flex items-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-600 hover:text-gray-600 dark:peer-checked:text-green-300 peer-checked:text-green-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      <p className="text-right">Gluten Free</p>
                    </div>
                  </div>
                </label>
              </li>
            </ul>

    
              {/* Ingredients  */}
              <div>
                <label
                  htmlFor="Ingredients"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter ingredients seperated by a comma
                </label>
                <div className="mt-2">
                  <textarea
                    id="Ingredients"
                    name="Ingredients"
                    type="text"
                    placeholder="eggs, sugar, milk"
                    autoComplete="Ingredients"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
              </div>

    
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
