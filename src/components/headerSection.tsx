"use client";


export default function HeaderSection({ImageURL,title,smallText}) {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={ImageURL}
          alt="Meal Picture"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {smallText}
            </p>
          </div>
        </div>
      </div>


      
    </>
  );
}