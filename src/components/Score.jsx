import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {StatisticsContext} from '../context/StatisticsContext'

const Container = styled.div`
  width: calc(100% - 30px);
  height: 100px;
  margin :15px;
  overflow: hidden;

  border-radius: 15px;

  display: grid;
  grid-template-columns: 50% 50%;
`

const NumberInput = styled.div`
  color: black;
  font-size: 40px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`

const Score = props => {
  const [stats, setStats] = useContext(StatisticsContext)
  return (
    <Container>
      <NumberInput>{stats.goals[0]}</NumberInput>
      <NumberInput>{stats.goals[1]}</NumberInput>
    </Container>
  )
}


export default Score
