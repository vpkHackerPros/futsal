import React, {useReducer, createContext} from 'react'
import Player from '../Player'

const PlayerContext = createContext()
const playersInit = Array(2).fill(Array(10).fill({st: 0, priimek: 'Priimković', goliskupaj: 0, tekme: 0, goliigra: 0}))
const goal = (team, numberLineup) => {
  const output = team.map((player, iter) => {
    if (iter != numberLineup) return player
    return { ...player, goliigra: Number(player.goliigra) + 1 }
  })
  console.log(output)
  return output
}

const playerReducer = (state, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'updateA': return [action.payload, state[1]]
    case 'updateB': return [state[0], action.payload]
    case 'goalA':   return [ goal(state[0], action.payload), state[1] ]
    case 'goalB':   return [ state[0], goal(state[1], action.payload)]
  }
}


const PlayerContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(playerReducer, playersInit)
  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  )
}

export {PlayerContext, PlayerContextProvider}
