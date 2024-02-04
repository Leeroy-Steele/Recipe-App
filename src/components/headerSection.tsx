"use client";


export default function HeaderSection({title,smallText}) {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-yellow-700 py-24 sm:py-32">

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