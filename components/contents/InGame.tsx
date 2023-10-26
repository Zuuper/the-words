import { Letter, LevelStatus } from "@/interfaces/game"
import { LetterCard } from "../ui/cards"
import { useAppSelector } from "@/hooks/useRedux"
import { useEffect, useId, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GET, GetDictionary } from "@/app/api/dictionary.api"
import { AnimatePresence, Reorder } from "framer-motion"

interface InGameProps {
  words: string[]
  status: LevelStatus,
  updatePosition: (letter: string, indexPosition: number) => void
}


const fisherYatesShuffle = (words: string[]) => {
  const array = words.slice()
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
export const InGame = () => {
  const [currentWordCount, setCurrentWordCount] = useState(0)
  const correctWords = useAppSelector(state => state.game.correctWords)
  const [word, setWord] = useState<string[]>([])
  const [correctWord, setCorrectWord] = useState('')
  const [wordMeaning, setWordMeaning] = useState('')
  const [wordExample, setWordExample] = useState('')
  const mutation = useMutation({
    mutationFn: async (word: string) => await GET(word),
    onSuccess: async (e: Response) => {
      const response = await e.json() as GetDictionary
      if (!response?.data) {
        alert("we can't find any meaning of the word")
        return
      }
      console.log(response.data[0].meanings)
    }
  })


  useEffect(() => {
    const word = correctWords[currentWordCount]
    const newWord = word.map((item) => item).join().replaceAll(',', '')
    setWord(fisherYatesShuffle(word))

    setCorrectWord(newWord)
    mutation.mutate(newWord)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWordCount, correctWords])
  return <>
    <h1 className='font-medium text-xl text-center'>{currentWordCount + 1}/{correctWords.length} Words</h1>
    <Reorder.Group axis="x" values={word} onReorder={setWord} className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-2'>
      {word.map((item, index) => {
        return <LetterCard key={Math.random()} letter={item} status="on-going" />
      })}
    </Reorder.Group>
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 text-center">
      <p>word description</p>
      <p className='text-xl'>{wordMeaning}</p>
    </div>
  </>
}