export type LevelStatus = "complete" | "on-going" | "wrong" | 'prepare'

export enum APP_STATE {
  start,
  playing,
  finish
}

export type Letter = {
  id: number,
  position: number,
  letter:string
}
export interface Game {
  state: APP_STATE,
  status: LevelStatus,
  currentWord: number,
  correctWords: string[][], //store all correct position of letter each words
  totalCorrect: number
} 