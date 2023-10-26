import { LevelStatus } from "@/interfaces/game"
import { Reorder, useMotionValue } from "framer-motion"
import { useId } from "react"
interface LetterCardProps {
  letter: string,
  status: LevelStatus,
  updateStatus?: () => void
}
export const LetterCard = ({ letter, status, updateStatus }: LetterCardProps) => {
  const y = useMotionValue(0);
  return <Reorder.Item key={Math.random()} value={letter} className='w-24 h-32 border cursor-grab border-slate-300 rounded-lg flex justify-center items-center text-2xl bg-white'>{letter}</Reorder.Item>
}