import React from 'react'
import styled from 'styled-components'
import FileSelector from './fileSelector'

const Imports  = props => {
  return (
    <div>
      <p>linup</p>
      <FileSelector endpoint={'lineup'} />
      <p>game id</p>
      <FileSelector endpoint={'lineup'} />
      <p>clock</p>
      <FileSelector endpoint={'lineup'} />
    </div>
  )
}


export default Imports
