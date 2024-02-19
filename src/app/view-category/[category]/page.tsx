"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/contextProvider";
import HeaderSection from "@/components/HeaderSection";
import Card from "@/components/card";
import Pagenation from "@/components/pagenation";
import useSWR from "swr";
import axios from "axios";
import { recipeCategories } from "@/context/recipeCategories"

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
    userName
  } = useContext(MyContext);

  const [category, setCategory] = useState(params.category)

  // get recipes from spoonacular
  const { data, error, isLoading } = useSWR(
    [
      `https://api.spoonacular.com/recipes/complexSearch?offset=${1}&number=${100}&cuisine=${
        category
      }`,
      "1cdfdd18388841c5b48f2d282e84dc00",
    ],
    ([url, apiKey]) => fetcher(url, apiKey)
  );

  const handleSetCategory = (category:string)=>{
    setCategory(category)
  }

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

      <div className="m-3">
      {recipeCategories.map((category)=>
        // <div>{category.name}</div>
        <button
        type="button"
        onClick={() => handleSetCategory(category.name)}
        className="text-black bg-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-grey-300 dark:hover:bg-grey-300  dark:focus:ring-blue-800"
      >
        {category.name}
      </button>
      )}
      </div>

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
