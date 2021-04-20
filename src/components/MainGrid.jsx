import React, { useContext } from 'react'
import styled from 'styled-components'
import {PlayerContext} from '../context/PlayerContext'
import SidePanel from './SidePanel'
import Middle from './Middle'

const Grid = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 35% 30% 35%;
  grid-template-rows: 15% 70% 15%;
  grid-template-areas:
    "header header header"
    "left   middle right"
    "footer footer footer";
`
const Header = styled.div`
  grid-area: header;
`
const Footer = styled.div`
  grid-area: footer;
`

const MainGrid = (props) => {
  console.log(PlayerContext)
  const Players = useContext(PlayerContext)
  return (
    <Grid>
      <SidePanel isTeamA={true} />
      <SidePanel isTeamA={false} />
      <Header />
      <Footer />
      <Middle />
    </Grid>
  )
}

export default MainGrid
