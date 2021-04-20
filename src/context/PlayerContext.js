import React, {useReducer, createContext} from 'react'
import Player from '../Player'

const PlayerContext = createContext()
const playersInit = Array(2).fill(Array(10).fill(Player('13','Mirko', 'Mirkić', '10')))

const PlayerContextProvider = ({children}) => {
  return (
    <PlayerContext.Provider value={playersInit}>
      {children}
    </PlayerContext.Provider>
  )
}

export {PlayerContext, PlayerContextProvider}
