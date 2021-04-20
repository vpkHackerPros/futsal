import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { PlayerContext, PlayerContextProvider } from '../context/PlayerContext'


const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0px;
  overflow: hidden;
  border-radius: 10px;
`
const PlayerRow = styled.button`
  box-sizing: border-box;
  height: 25px;
  width: 100%;
  text-align: left;
  font-size: 15px;
  padding: 2px;
  border: none;
  background: ${ props => props.isChosen ? 'yellow' : 'white' };

  :focus {
    outline: none;
  }
`

const PlayersGrid = ( props ) => {
  const players = useContext(PlayerContext)
  const [isChosen, setIsChosen] = useState('0')
  return (
    <Container>
      {
        players[0]?.map((player, iter) => <PlayerRow
            onClick={() => setIsChosen(iter)}
            isChosen={isChosen == iter}
          >{`${player?.number}  ${player?.name} ${player?.surname}`}</PlayerRow>
        )
      }
    </Container>
  )
}

export default PlayersGrid
