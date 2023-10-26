import { APP_STATE, Game, Letter, LevelStatus } from "@/interfaces/game"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState:Game = {
  state:APP_STATE.start,
  status:'prepare',
  currentWord: 0,
  correctWords: [],
  totalCorrect: 0
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateState:(state,action:PayloadAction<APP_STATE>) =>{
      state.state = action.payload
    },
    updateStatus:(state,action:PayloadAction<LevelStatus>) => {
      state.status = action.payload
    },
    setCorrectWords:(state,action:PayloadAction<string[][]>) => {
      state.correctWords = action.payload
    },

    setTotalCorrect: (state,action:PayloadAction<number>) => {
      state.totalCorrect = action.payload
    }
  }
})

export const gameAction = gameSlice.actions

export default gameSlice.reducer