import React from 'react'
import styled from 'styled-components'
import Imports from './Imports'

const StyledFooter = styled.div`
  grid-area: footer;
`


const Footer = props => {
  return (
    <StyledFooter>
      <Imports />
    </StyledFooter>
  )
}

export default Footer
