import { useContext, useState } from "react";
import { MyContext } from "@/context/contextProvider";

export default function pillButtons({
  name,
  recipe,
}: {
  name: string;
  recipe: object;
}) {
  // for the context
  const { userName } = useContext(MyContext);

  const [buttonType, setButtonType] = useState(name);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleRemoveFavourite = () => {
    const raw = JSON.stringify({
      _id: recipe._id,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/favourite-recipes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setButtonType("Deleted");
      })
      .catch((error) => console.log("error", error));
  };

  const handleSaveToFavourite = () => {
    const raw = JSON.stringify({
      id: recipe.id,
      userName: userName,
      isFavourite: true,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      instructions: recipe.instructions,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenFree: recipe.glutenFree,
      dairyFree: recipe.dairyFree,
      pricePerServing: recipe.pricePerServing,
      extendedIngredients: recipe.extendedIngredients,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/favourite-recipes", requestOptions)
      .then((response) => response.text())
      .then((result) => setButtonType("Saved"))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {buttonType === "Delete" ? (
        <button
          type="button"
          onClick={() => handleRemoveFavourite()}
          className="mx-auto text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {name}
        </button>
      ) : null}

      {buttonType === "Save" ? (
        <button
          type="button"
          onClick={() => handleSaveToFavourite()}
          className="mx-auto text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {name}
        </button>
      ) : null}

      {buttonType === "Saved" ? (
        <button
          type="button"
          style={{ backgroundColor: "blue" }}
          className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Saved
        </button>
      ) : null}
      {buttonType === "Deleted" ? (
        <button
          type="button"
          style={{ backgroundColor: "red" }}
          className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Deleted
        </button>
      ) : null}
    </>
  );
}
