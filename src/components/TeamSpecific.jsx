import React from 'react'
import styled from 'styled-components'
import Button from './mini_components/Button'

const TeamSpecific = props => {
  const lineup = () => {
    if (props.isTeamA) return fetch('http://localhost:4545/GFX_lineupA')
    return fetch('http://localhost:4545/GFX_lineupB')
  }
  const coach = () => {
    if (props.isTeamA) return fetch('http://localhost:4545/GFX_coach/0')
    return fetch('http://localhost:4545/GFX_coach/1')
  }
  const timeout = () => {
    if (props.isTeamA) return fetch('http://localhost:4545/GFX_timeout/0')
    return fetch('http://localhost:4545/GFX_timeout/1')
  }
  return (
    <>
      <Button onClick={lineup} >lineup</Button>
      <Button onClick={coach}>coach</Button>
      <Button onClick={timeout}>timeout</Button>
    </>
  )
}

export default TeamSpecific
