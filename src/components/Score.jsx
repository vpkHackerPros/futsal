import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: calc(100% - 30px);
  height: 100px;
  background: white;
  margin :15px;

  border-radius: 15px;

  display: grid;
  grid-template-columns: 50% 50%;
`

const NumberInput = styled.input`
  color: black;
  font-size: 40px;
  text-align: center;
  border: none;
  background: none;
`

const Score = props => {
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  return (
    <Container>
      <NumberInput value={scoreA} onChange={evt => setScoreA(evt.target.value)} type={'number'} />
      <NumberInput value={scoreB} onChange={evt => setScoreB(evt.target.value)} type={'number'} />
    </Container>
  )
}


export default Score
