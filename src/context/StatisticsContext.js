import React, {useReducer, createContext} from 'react'
import Player from '../Player'

const StatisticsContext = createContext()
const statisticsInit = {
  goals: [0,0],
  shots: [0,0],
  attempts: [0,0],
  fouls: [0,0],
  yellows: [0,0],
  reds: [0,0]
}

//team = 0 / 1
const IncrementStat = (prevVal, team) => {
  if (team) return [prevVal[0], Number(prevVal[1]) + 1]
  return [Number(prevVal[0]) + 1, prevVal[1]]
}
const decrementStat = (prevVal, team) => {
  if (team) return [prevVal[0], Number(prevVal[1]) - 1 > 0 ? Number(prevVal[1]) - 1 : 0]
  return [Number(prevVal[0]) - 1 > 0 ? Number(prevVal[0]) - 1 : 0, prevVal[1]]
}

function reducer(state, action) {
  switch (action.type) {
    case 'goal':
      return {...state, goals: IncrementStat(state.goals, action.team)};
    case 'shot':
      return {...state, shots: IncrementStat(state.shots, action.team)};
    case 'attempt':
      return {...state, attempts: IncrementStat(state.attempts, action.team)};
    case 'foul':
      return {...state, fouls: IncrementStat(state.fouls, action.team)};
    case 'yellow':
      return {...state, yellows: IncrementStat(state.yellows, action.team)};
    case 'red':
      return {...state, reds: IncrementStat(state.reds, action.team)};
    case 'goalTakeAway':
      return {...state, goals: decrementStat(state.goals, action.team)};
    case 'shotTakeAway':
      return {...state, shots: decrementStat(state.shots, action.team)};
    case 'attemptTakeAway':
      return {...state, attempts: decrementStat(state.attempts, action.team)};
    case 'foulTakeAway':
      return {...state, fouls: decrementStat(state.fouls, action.team)};
    case 'yellowTakeAway':
      return {...state, yellows: decrementStat(state.yellows, action.team)};
    case 'redTakeAway':
      return {...state, reds: decrementStat(state.reds, action.team)};
    default:
      throw new Error();
  }
}

const StatisticsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, statisticsInit);

  return (
    <StatisticsContext.Provider value={[state, dispatch]}>
      {children}
    </StatisticsContext.Provider>
  )
}

export {StatisticsContext, StatisticsContextProvider}
