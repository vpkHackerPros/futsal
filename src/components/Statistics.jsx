import React, { useContext } from 'react'
import styled from 'styled-components'
import {StatisticsContext} from '../context/StatisticsContext'


const StyledInput = styled.input`

height: 30px;
width: 40px;
border:none;
border-radius: 3px;
`
const Container = styled.div`
  width: 50%;
  height: 130px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  `


const Input = props => <StyledInput type={'number'} value={props.value} onChange={evt => props.setValue(evt.target.value)} />



const Statistics = props => {
  const [stats, setStats] = useContext(StatisticsContext)


  return (
    <Container>
      <Input value={stats.goals[0]}/>
      <div>GOLI</div>
      <Input value={stats.goals[1]}/>
      <div></div>
      <Input value={stats.shots[0]}/>
      <div>STRELI</div>
      <Input value={stats.shots[1]}/>
      <Input value={stats.fouls[0]}/>
      <div>FOULI</div>
      <Input value={stats.fouls[1]}/>
      <div></div>
      <Input value={stats.yellows[0]}/>
      <div>RUMENI</div>
      <Input value={stats.yellows[1]}/>
      <Input value={stats.attempts[0]}/>
      <div>POSKUSI</div>
      <Input value={stats.attempts[1]}/>
      <div></div>
      <Input value={stats.reds[0]}/>
      <div>RDECI</div>
      <Input value={stats.reds[1]}/>
    </Container>
  )
}

export default Statistics
