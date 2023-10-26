
export interface GetWord {
  data: string[],
  status: number
}
export async function GET(totalWords: number,wordLength?:number){
const response = await fetch(`https://random-word-api.vercel.app/api?words=${totalWords}${wordLength ? "&length=" + wordLength.toString() : ''}`)
  if(!response.ok){
    throw new Error("There's error when Fetch words")
  }
  const data = await response.json()
  return Response.json({data:data,status: response.status} as GetWord) 
}