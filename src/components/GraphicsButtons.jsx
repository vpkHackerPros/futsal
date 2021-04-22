import React from 'react'
import styled from 'styled-components'
import Button from './mini_components/Button'

const Container = styled.div`
  margin: auto;
  margin-top: 20px;

  width: fit-content;
`

const GraphicsButtons = props => {
  return (
    <Container>
      <Button>GAME ID</Button>
      <Button>statistics</Button>
      <Button>rumen</Button>
      <Button>rdec</Button>
      <Button>match score</Button>
      <Button>penalty shootout</Button>
    </Container>
  )
}


export default GraphicsButtons
