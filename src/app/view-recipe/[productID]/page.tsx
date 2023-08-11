"use client";

import { useState, useEffect } from "react";

// imports for data fetching
import { useAxios } from "@/hooks/useAxios";
import useSWR from "swr";
import axios from "axios";

//for tailwaind css
import { PaperClipIcon } from "@heroicons/react/20/solid";

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

export default function Page({ params }: { params: { productID: number } }) {
  const { data, error, isLoading } = useSWR(
    [
      `https://api.spoonacular.com/recipes/${params.productID}/information`,
      "1cdfdd18388841c5b48f2d282e84dc00",
    ],
    ([url, apiKey]) => fetcher(url, apiKey)
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  !isLoading && console.log(data);

  return (
    <div className="relative isolate overflow-hidden px-24 py-12">
      {!isLoading && (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900 text-center">
              {data.title}
            </h3>
            <img style={{margin:"auto",borderRadius:"50px"}} src={data.image} width={"800"} />
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Summary
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" dangerouslySetInnerHTML={{__html: data.summary}}>
                  {/* data comes from dangerouslySetInnerHTML above*/}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ingredients
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                {data.extendedIngredients.map((ingredient:any) => (
                  <div key={ingredient.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">

                    <p key={ingredient.id} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {ingredient.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Servings
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data.servings}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ready in (Minutes)
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data.readyInMinutes}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900" >
                  Cooking instructions
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" dangerouslySetInnerHTML={{__html: data.instructions}}>
                  {/* data comes from dangerouslySetInnerHTML above*/}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Vegetarian
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {data.vegetarian?"Yes":"No"}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Vegan
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {data.vegan?"Yes":"No"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
