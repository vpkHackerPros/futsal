import React from 'react'
import styled from 'styled-components'
import FileSelector from './fileSelector'

const StyledFooter = styled.div`
  grid-area: footer;
`


const Footer = props => {
  return (
    <StyledFooter>
      <FileSelector endpoint={'lineup'} />
    </StyledFooter>
  )
}

export default Footer
