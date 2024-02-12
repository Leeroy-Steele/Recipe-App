"use client";
import PillButtons from "./pillButtons";
import Link from "next/link";

export default function Card({ product, reload }: any) {



  return (
    <div className="group">
      <Link href={`/view-recipe/${product.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.image}
            alt="Meal image"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      </Link>
      {product.isFavourite ? (
        <PillButtons name="Delete" recipe={product} />
      ) : (
        <PillButtons name="Save" recipe={product} />
      )}
    </div>
  );
}