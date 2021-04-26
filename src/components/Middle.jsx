import React from 'react'
import styled from 'styled-components'
import StatisticsButtons from './StatisticsButtons'
import GraphicsButtons from './GraphicsButtons'
import Shooters from './Shooters'
import Statistics from './Statistics'
import Halftime from './Halftime'

const Container = styled.div`
  grid-area: middle;
`

const Middle = ( props ) => {
  return (
    <Container>
      <Halftime />
      <Statistics />
      <StatisticsButtons handleGoal={props.handleGoal} isTeamA={props.isTeamA} />
      <GraphicsButtons />
      <Shooters />
    </Container>
  )
}

export default Middle
