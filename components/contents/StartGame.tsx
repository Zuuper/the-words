'use client'
import { useState } from "react"
import { Button } from "../ui/Button"
import { GET, GetWord, } from "@/app/api/word.api"
import { useAppDispatch } from "@/hooks/useRedux"
import { APP_STATE, Letter } from "@/interfaces/game"
import { gameAction } from "@/store/features/game"
import { useMutation } from "@tanstack/react-query"


const wordToArray = (words: string[]): string[][] => {
  const data: string[][] = []
  for (let word of words) {
    const wordInArray = word.split('')
    const newWord: string[] = wordInArray.map((item, index) => {
      return item
    })
    data.push(newWord)
  }
  return data
}
export const StartGame = () => {
  const dispatch = useAppDispatch()
  const [totalWords, setTotalWords] = useState('2')
  const [lengthWord, setLengthWord] = useState('4')

  const mutation = useMutation({
    mutationFn: async () => await GET(+totalWords, +lengthWord),
    onSuccess: async (e: Response) => {
      const response = await e.json() as GetWord
      if (!response?.data) {
        alert("we can't find any word")
        return
      }
      const words = wordToArray(response.data)
      dispatch(gameAction.setCorrectWords(words))
      dispatch(gameAction.updateState(APP_STATE.playing))
    }
  })


  return <>
    <h1 className='text-center text-xl text-slate-900'>The Words</h1>
    <div className='absolute left-1/2 -translate-x-1/2 top-1/2 transalte-y-1/2 flex flex-col gap-4 justify-center'>
      <div className="flex gap-4 max-w-xs">
        <div className="flex flex-col">
          <label htmlFor="" className="text-slate-600">total word</label>
          <input type="number" max={10} min={1} className="w-24 p-4 border font-semibold border-slate-200 rounded-lg" value={totalWords} onChange={(e) => setTotalWords(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-slate-600" >word length</label>
          <input type="number" max={6} min={3} className="w-24 p-4 border font-semibold border-slate-200 rounded-lg" value={lengthWord} onChange={(e) => setLengthWord(e.target.value)} />
        </div>
      </div>
      <Button onClick={() => {
        mutation.mutate()
      }} isLoading={mutation.isPending}> Start game</Button>
    </div>
  </>
}

