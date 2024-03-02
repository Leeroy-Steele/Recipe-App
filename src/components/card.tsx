"use client";
import PillButtons from "./PillButtons";
import Link from "next/link";

export default function Card({ product }: any) {
  // console.log(product.isFavourite)
  return (
    <div className="group">
      
      {product.isFavourite !== undefined ?
            product.isFavourite ? (
              <PillButtons name="Delete" recipe={product} />
            ) : (
              <PillButtons name="Save" recipe={product} />
            )
              :null}


      <Link href={`/view-recipe/${product.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.image}
            alt="Meal image"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </Link>

      <h3
        className="text-center mt-4 text-sm text-gray-800"
      >
        {product.title}
      </h3>
    </div>
  );
}
