import React from 'react'
import styled from 'styled-components'
import PlayersGrid from './PlayersGrid'

const Container = styled.div`
  grid-area: ${ props => props.isTeamA ? 'left' : 'right' };
`

const SidePanel = (props) => {
  return (
    <Container isTeamA={props.isTeamA}>
      <PlayersGrid />
    </Container>
  )
}

export default SidePanel
