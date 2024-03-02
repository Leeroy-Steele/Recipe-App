"use client";
import backgroundImage from "../../public/images/1.jpg"

export default function HeaderSection({title,smallText}:any) {
  return (
    <>
      <div 
        style={{ 
          backgroundImage: `url(${backgroundImage.src})`,
          width: '100%',
          // height: '200px',
      }}
        className="relative isolate overflow-hidden py-24 sm:py-32"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* <div className="mx-auto max-w-2xl lg:mx-0"> */}
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-center">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 text-center">
              {smallText}
            </p>
          {/* </div> */}
        </div>
      </div>


      
    </>
  );
}