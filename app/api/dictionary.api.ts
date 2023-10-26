

type Meaning = {
  definitions: {
    antonyms: string[],
    definition: string,
    synonims: string[],
    example?: string 
  }[]
}
export interface Dictionary {
  meanings: Meaning[]
}


export interface GetDictionary {
  data: Dictionary[],
  status: number
}
export async function GET(word:string){
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  if(!response.ok){
    throw new Error("there's error when Fetch Word dictionary")
  }
  const data = await response.json()
  return Response.json({data:data, status: response.status})
}