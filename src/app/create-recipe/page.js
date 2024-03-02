"use client";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/contextProvider";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import HeaderSection from "@/components/headerSection";
import backgroundImage from "../../../public/images/1.jpg";

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
  const [recipeIsVegetarian, setRecipeIsVegetarian] = useState(false);
  const [recipeIsVegan, setRecipeIsVegan] = useState(false);
  const [recipeIsGlutenFree, setRecipeIsGlutenFree] = useState(false);
  const [recipeIsDairyFree, setRecipeIsDairyFree] = useState(false);
  const [recipePricePerServing, setRecipePricePerServing] = useState(0);
  const [extendedIngredients, setIngredients] = useState("");

  //for dynamic form (for instructions inputs)
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      test: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "test" });

  // for page redirect
  const router = useRouter();

  // for when submitting the form
  const onFormSubmit = (recipeInstructions) => {
    const ingredientsArray = extendedIngredients.split(",");
    let modifiedIngredientsArray = ingredientsArray.map((ingredient) => {
      return { name: ingredient };
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
      analyzedInstructions: [
        {
          steps: recipeInstructions.test.map((instr, index) => {
            return { step: instr.value, number: index + 1 };
          }),
        },
      ],
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
        router.push("/favourite-recipes");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="">
      <HeaderSection title={`Create your own recipe here`} smallText={``} />

      {/* Form Div */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-7xl">

        {/* Diet buttons */}
        <ul className="mt-8 grid w-full gap-2 lg:grid-cols-4 grid-cols-2 max-w-2xl mx-auto">
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

        <form
          className="space-y-6 grid gap-10 lg:grid-cols-2"
          // onSubmit={handleSubmit(onFormSubmit)}
        >
          {/* Big screen - Left Side */}
          <div>
            {/* title */}
            <div className="mt-6">

              <h3 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
                Recipe Title *
              </h3>
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

            {/* New Recipe Instructions */}
            <div>
              <h3 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
                Recipe Steps
              </h3>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-auto w-100"
                onClick={() => append({ value: "" })}
                type="button"
              >
                Add Step
              </button>
              {fields.map(({ id }, index) => {
                return (
                  <div key={id}>
                    <div>
                      <div className="mt-2">
                        <textarea
                          id="steps"
                          name="steps"
                          type="text"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register(`test.${index}.value`)}
                        />
                        <button
                          className="bg-white hover:bg-gray-100 text-red-800 font-semibold py-1 px-4 "
                          onClick={() => remove(index)}
                        >
                          {`Remove Step ${index + 1}`}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Big screen - Right Side */}
          <div>
            {/* Image URL */}
            <div className="text-center">
              <h3 className="mt-4 text-center text-xl leading-9 tracking-tight text-gray-900">
                Image URL
              </h3>
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

            {/* Ingredients  */}
            <div className="my-6 text-center">
              <h3 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
                Enter ingredients seperated by a comma
              </h3>
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

            {/* Recipe Description */}
            <div className="mb-6">
              <div className="text-center">
                {/* <label
                  htmlFor="recipeSummary"
                  className="block text-sm font-medium leading-6 text-gray-900 "
                >
                  Recipe Description *
                </label> */}
                <h3 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
                  Enter ingredients seperated by a comma
              </h3>
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
          </div>
        </form>
      </div>

      {/* Save Button */}
      {/* <div className="mt-20 flex flex-row align-center gap-6 m-auto"> */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          width: "100%",
          // height: '200px',
        }}
        className="mt-6 overflow-hidden py-12 "
      >
        <div className="flex flex-row align-center gap-6">
          <h3 className=" text-white text-xl leading-9 tracking-tight text-gray-900">
            This will save your new recipe to your favourites page
          </h3>
          <button
            type="button"
            onClick={handleSubmit(onFormSubmit)}
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
