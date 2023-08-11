"use client"

const axios = require('axios');

export const useAxios = async (url, apiKey) => {

    if(apiKey){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
              'x-api-key': apiKey
            }
          };
          
          let apiData = await axios.request(config)
          .then((response) => {
            // console.log(response.data);
            return (response.data)
          })
          .catch((error) => {
            console.log(error);
          });

          return apiData

    }else{

        fetch(url)
        .then((result) => console.log(result))
        .then((res) => res.json())
        .catch((error) => console.log("error", error));

    }

};
