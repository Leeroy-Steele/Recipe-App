"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/contextProvider";
import HeaderSection from "@/components/HeaderSection";
import Card from "@/components/card";
import Pagenation from "@/components/pagenation";
import useSWR from "swr";
import axios from "axios";

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

export default function Home({ params }: { params: { category: string } }) {
  // for the context
  const {
    userName,
    updateUserName,
    userEmail,
    updateEmail,
    loggedIn,
    updateLoggedIn,
  } = useContext(MyContext);

  // get recipes from spoonacular
  const { data, error, isLoading } = useSWR(
    [
      `https://api.spoonacular.com/recipes/complexSearch?offset=${1}&number=${100}&cuisine=${
        params.category
      }`,
      "1cdfdd18388841c5b48f2d282e84dc00",
    ],
    ([url, apiKey]) => fetcher(url, apiKey)
  );

  // fetch favourite recipes
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMyRecipes(result);
      })
      .then(() => {
        // map through each user recipe to find match with spoonacular recipes (data)
        myRecipes.forEach((myRecipe)=>{
          
          // console.log(myRecipe)
          let myRecipeId = myRecipe.id

          // tag my favourites
          data.results.forEach((categoryRecipe)=>{
            let categoryRecipeID = categoryRecipe.id
            if(categoryRecipeID===myRecipeId){
              // add isFavourite = true
              categoryRecipe.isFavourite = true
              categoryRecipe._id = myRecipe._id
            }
          })
        })

        // tag non favourites with isFavourite = false
        data.results.forEach((categoryRecipe)=>{
          if(categoryRecipe.isFavourite!==true){
            // add isFavourite = true
            categoryRecipe.isFavourite = false
          }
        })
      })
      .catch((error) => console.log("error", error));

  }, [data, isLoading]);

  return (
    <>
      <HeaderSection title={`${params.category} Recipes`} smallText="" />

      {/* {!isLoading && (
        <Pagenation
          totalItems={data.results.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resultsPerPage={resultsPerPage}
          setResultsPerPage={setResultsPerPage}
          firstItem={firstItem}
          lastItem={lastItem}
        />
      )} */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {!isLoading &&
              !error &&
              data.results.map((product: any) => (
                <Card key={product.id} product={product}></Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
