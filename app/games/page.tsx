"use client"
import { StartGame } from '@/components/contents/StartGame'
import { APP_STATE } from '@/interfaces/game'
import React from 'react'
import { useAppSelector } from '@/hooks/useRedux'
import { InGame } from '@/components/contents/InGame'


export default function Page() {
  const state = useAppSelector(state => state.game.state)

  return (
    <div className='relative w-screen h-screen p-8'>
      {state == APP_STATE.start && <StartGame />}
      {state == APP_STATE.playing && <InGame />}
      {/* {state == APP_STATE.start && <StartGame startGameHandler={startGameHandler} />} */}
    </div>
  )
}













