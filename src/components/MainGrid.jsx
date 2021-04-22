import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import {PlayerContext} from '../context/PlayerContext'
import SidePanel from './SidePanel'
import Middle from './Middle'
import Footer from './Footer'

const Grid = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 15% 70% 15%;
  grid-template-areas:
    "header header header"
    "left   middle right"
    "footer footer footer";
  box-sizing: border-box;
  padding: 10px;
`
const Header = styled.div`
  grid-area: header;
`

const MainGrid = (props) => {
  const [isTeamA, setIsTeamA] = useState(0)
  return (
    <Grid>
      <SidePanel setThisTeam={() => setIsTeamA(0)} isTeamA={true} />
      <SidePanel setThisTeam={() => setIsTeamA(1)} isTeamA={false} />
      <Header />
      <Footer />
      <Middle isTeamA={isTeamA} />
    </Grid>
  )
}

export default MainGrid
