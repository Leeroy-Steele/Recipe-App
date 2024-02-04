"use client";

import { useContext, useEffect, useState } from "react";
import { recipeCategories } from "@/context/recipeCategories";
import HeaderSection from "@/components/HeaderSection";

// imports for data fetching
import useSWR from "swr";
import { useAxios } from "@/hooks/useAxios";

export default function Home() {
  console.log(recipeCategories);

  return (
    <>
      <HeaderSection
        title="Lee's Recipe App"
        smallText="Its going to be pretty good"
      />

      <section className="bg-white  py-24 px-4 lg:px-16">
        <div className="container mx-auto px-[12px] md:px-24 xl:px-12  nanum2">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-28 lg:gap-y-16">
            {recipeCategories.map((cat: object) => (
              <div className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <a href={`/view-category/${cat.name}`} className="block">
                  <div className="h-28">
                    <div className="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                      <img
                        src={cat.imageSrc}
                        className="w-36 h-36  mt-6 m-auto"
                        alt="misc icon"
                        loading="lazy"
                        width="200"
                        height="200"
                        style={{ filter: "invert(1)" }}
                      />
                    </div>
                  </div>
                  <div className="p-6   z-10 w-full   ">
                    <p className="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                      {cat.name}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
