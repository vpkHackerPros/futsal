import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  height: 14px;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

const Shooters = props => {
  return (
    <Container>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Container>
  )
}

export default Shooters
