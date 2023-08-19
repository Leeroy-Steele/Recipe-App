"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/contextProvider";
import HeaderSection from "@/components/HeaderSection";
import Card from "@/components/card";
import Pagenation from "@/components/pagenation"

// imports for data fetching
import useSWR from "swr";
import {useAxios} from "@/hooks/useAxios"

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  let firstItem = currentPage * resultsPerPage - (resultsPerPage - 1);
  let lastItem = currentPage * resultsPerPage;

  const { data, error, isLoading, isValidating } = useSWR([`https://api.spoonacular.com/recipes/complexSearch?offset=${firstItem}&number=${400}`,"1cdfdd18388841c5b48f2d282e84dc00"],([url, token]) => useAxios(url, token))


  return (
    <>
      <HeaderSection
        title="Lee's Recipe App"
        smallText="Its going to be pretty good"
        ImageURL="https://img.freepik.com/free-photo/dark-plate-with-waffles-grapes-dark-background_23-2148340373.jpg"
      />

      {!isLoading&&<Pagenation totalItems={data.results.length} currentPage={currentPage} setCurrentPage={setCurrentPage} resultsPerPage={resultsPerPage} setResultsPerPage={setResultsPerPage} firstItem={firstItem} lastItem={lastItem} />}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {!isLoading && !error && data.results.map((product:any) => (
              <Card key={product.id} product={product}></Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
