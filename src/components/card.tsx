"use client";



export default function Card({product}:any) {
  return (
    <>
      <a key={product.id} href={`/view-recipe/${product.id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.image}
            alt="Meal image"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
        
      </a>
    </>
  );
}
