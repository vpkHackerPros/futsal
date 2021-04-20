import React from 'react'
import styled from 'styled-components'
import StatisticsButtons from './StatisticsButtons'
import Score from './Score'

const Container = styled.div`
  grid-area: middle;
`

const Middle = ( props ) => {
  return (
    <Container>
      <Score></Score>
      <StatisticsButtons />
    </Container>
  )
}

export default Middle
