"use client"

import { useState, useEffect } from "react";

const useFetch = (url, method, bodyObject, apiKey) => {
  const [data, setData] = useState(null);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  if(apiKey){
    myHeaders.append("x-api-key", apiKey);
  }

  let requestOptions = {
    method: method,
    headers: myHeaders,
    body: bodyObject,
    redirect: 'follow'
  };

  // if(method==="GET"){
  //   delete requestOptions.body
  //   console.log("hello")
  // }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => {
      // console.log(res.json())
      return res.json()
      })
      .then((data) => setData(data.results));
  }, [url]);

  return data
};

export default useFetch;