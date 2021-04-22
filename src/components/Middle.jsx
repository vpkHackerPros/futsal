import React from 'react'
import styled from 'styled-components'
import StatisticsButtons from './StatisticsButtons'
import Score from './Score'
import GraphicsButtons from './GraphicsButtons'
import Shooters from './Shooters'
import Statistics from './Statistics'

const Container = styled.div`
  grid-area: middle;
`

const Middle = ( props ) => {
  return (
    <Container>
      <Score />
      <Statistics />
      <StatisticsButtons isTeamA={props.isTeamA} />
      <GraphicsButtons />
      <Shooters />
    </Container>
  )
}

export default Middle
