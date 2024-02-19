"use client";
import { useContext, useEffect, useState } from "react";
import PillButtons from "@/components/pillButtons";

import { MyContext } from "@/context/contextProvider";

// imports for data fetching
import useSWR from "swr";
import axios from "axios";

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
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return resp;
};

export default function Page({ params }: { params: { productID: number } }) {
  // for the context
  const {
    userName,
    updateUserName,
    userEmail,
    updateEmail,
    loggedIn,
    updateLoggedIn,
  } = useContext(MyContext);

  const [displayData, setDisplayData] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  // const { data, error, isLoading } = useSWR(
  //   [
  //     `https://api.spoonacular.com/recipes/${params.productID}/information`,
  //     "1cdfdd18388841c5b48f2d282e84dc00",
  //   ],
  //   ([url, apiKey]) => fetcher(url, apiKey)
  // );

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // !isLoading && console.log(data);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "1cdfdd18388841c5b48f2d282e84dc00");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.spoonacular.com/recipes/${params.productID}/information`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let recipe = result

        // get user recipes to find out if favourite
        const requestOptions2 = {
          method: "GET",
          redirect: "follow",
        };

        // get recipes
        fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions2)
          .then((response) => response.json())
          .then((result2) => {
            // setUserRecipes(result2);
            
          });
      })
      .catch((error) => console.log("error", error));
  }, []);

  // get user recipes to find out if favourite
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  // // get recipes
  //   fetch(`/api/favourite-recipes?userName=${userName}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       // setUserRecipes(result);
  //     })
  //     .catch((error) => console.log("error", error));

  return (
    <div></div>
    // <div className="relative isolate overflow-hidden px-24 py-12">
    //   {!isLoading && (
    //     <div>
    //       <div className="px-4 sm:px-0">
    //         <h3 className="text-lg font-semibold pb-3 text-gray-900 text-center">
    //           {data.title}
    //         </h3>

    //         <div className="flex flex-col items-center justify-center">
    //           {true ? (
    //             <PillButtons name="Delete" recipe={data}></PillButtons>
    //           ) : (
    //             <PillButtons name="Save" recipe={data}></PillButtons>
    //           )}
    //         </div>

    //         <h4 className="max-w-fit px-4 py-1 rounded bg-green-200 text-center width-500px m-auto">
    //           {data.vegan ? "Vegan" : data.vegetarian ? "Vegetarian" : ""}
    //         </h4>
    //         <dd
    //           className="my-5 leading-6"
    //           dangerouslySetInnerHTML={{ __html: data.summary }}
    //         >
    //           {/* data comes from dangerouslySetInnerHTML above*/}
    //         </dd>

    //         <img
    //           style={{ margin: "auto", borderRadius: "50px" }}
    //           src={data.image}
    //           width={"800"}
    //         />
    //       </div>
    //       <div className="mt-6 border-t border-gray-100">
    //         <dl className="divide-y divide-gray-100">
    //           <div className="px-4 py-6 md:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">
    //               Ingredients
    //             </dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"></dd>
    //             {data.extendedIngredients.map((ingredient: any) => (
    //               <div
    //                 key={ingredient.id}
    //                 className="px-1 py-1 sm:gap-4 sm:px-0 bg-gray-100"
    //               >
    //                 <p
    //                   key={ingredient.id}
    //                   className="mt-1 rounded-lg text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-1 text-center"
    //                 >
    //                   {ingredient.name}
    //                 </p>
    //               </div>
    //             ))}
    //           </div>

    //           <div className="px-4 py-6 md:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">
    //               Servings: {data.servings}
    //             </dt>

    //             <dt className="text-sm font-medium leading-6 text-gray-900">
    //               Ready in: {data.readyInMinutes} (Minutes)
    //             </dt>
    //           </div>

    //           <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">
    //               Cooking instructions
    //             </dt>
    //             <dd
    //               className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
    //               dangerouslySetInnerHTML={{ __html: data.instructions }}
    //             >
    //               {/* data comes from dangerouslySetInnerHTML above*/}
    //             </dd>
    //           </div>
    //         </dl>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
