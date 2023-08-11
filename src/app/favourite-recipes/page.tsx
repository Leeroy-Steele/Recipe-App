"use client"

import useSWR from 'swr'
const fetcher = (url:string) => fetch(url).then(res => res.json())

export default function FavouriteRecipesPage() {

  const { data, error, isLoading } = useSWR('/api/favourite-recipes', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

    return (
      <>
        <h4>My Favourite Recipes Page</h4>

        {!isLoading&&data.data.map((item:Array<string>)=><p style={{padding:"10px"}}>{item.name}</p>)}

      </>
    )
  }
  