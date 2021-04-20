import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
height: 172px;
width: 384px;
margin: auto;

`
const Button = styled.button`
font-size: 30px;
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
  return (
    <Container>
      <Button>⚽</Button>
      <Button>🥅</Button>
      <Button>💩</Button>
      <Button>⛔</Button>
      <Button>🟡</Button>
      <Button>🔴</Button>


    </Container>
  )
}

export default StatisticsButtons
