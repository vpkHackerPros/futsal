import React, {useContext} from 'react'
import styled from 'styled-components'
import {StatisticsContext} from '../context/StatisticsContext'


const Container = styled.div`
height: 172px;
width: 384px;
margin: auto;

`
const Button = styled.button`
font-size: 50px;
height: 80px;
width: 120px;
background: white;
border: none;
border-radius: 20px;
margin: 4px;
padding: 5px;
:focus {
  outline: none;
}
`

const StatisticsButtons = ( props ) => {
  const [stats, setStats] = useContext(StatisticsContext)

  const handleGoal = () => {
    setStats({type: 'goal', team: props.isTeamA})
  }
  const handleShot = () => {
    setStats({type: 'shot', team: props.isTeamA})
  }
  const handleAttempt = () => {
    setStats({type: 'attempt', team: props.isTeamA})
  }
  const handleFoul = () => {
    setStats({type: 'foul', team: props.isTeamA})
  }
  const handleYellow = () => {
    setStats({type: 'yellow', team: props.isTeamA})
  }
  const handleRed = () => {
    setStats({type: 'red', team: props.isTeamA})
  }
  const takeAwayGoal = () => {
    setStats({type: 'goalTakeAway', team: props.isTeamA})
  }
  const takeAwayShot = () => {
    setStats({type: 'shotTakeAway', team: props.isTeamA})
  }
  const takeAwayAttempt = () => {
    setStats({type: 'attemptTakeAway', team: props.isTeamA})
  }
  const takeAwayFoul = () => {
    setStats({type: 'foulTakeAway', team: props.isTeamA})
  }
  const takeAwayYellow = () => {
    setStats({type: 'yellowTakeAway', team: props.isTeamA})
  }
  const takeAwayRed = () => {
    setStats({type: 'redTakeAway', team: props.isTeamA})
  }
  return (
    <Container>
      <Button onClick={handleGoal}    onContextMenu={takeAwayGoal}    >⚽</Button>
      <Button onClick={handleShot}    onContextMenu={takeAwayShot}    >🥅</Button>
      <Button onClick={handleAttempt} onContextMenu={takeAwayAttempt} >🚀</Button>
      <Button onClick={handleFoul}    onContextMenu={takeAwayFoul}    >🚑</Button>
      <Button onClick={handleYellow}  onContextMenu={takeAwayYellow}  >🟡</Button>
      <Button onClick={handleRed}     onContextMenu={takeAwayRed}     >🔴</Button>
    </Container>
  )
}

export default StatisticsButtons
