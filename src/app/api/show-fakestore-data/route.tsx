import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://fakestoreapi.com/products', {})
  const data = await res.json()
  const data2 = data[0]
 
  return NextResponse.json( {data2} )
}